import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/user';
import { RestService } from '../../Services/rest.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(UsersComponent)
  child!: UsersComponent;

  adminEntered = false
  myStorage = window.sessionStorage
  admin = new User()
  addUserClicked = false
  dataChanged = new Subject<boolean>()
  constructor(private rs: RestService) {

  }
  submitClicked(data: Number) {
    if (data == 0) {
      this.addUserClicked = false
      this.dataChanged.next(true);
    } else {
      this.addUserClicked = true
    }
  }
  addUserClick() {
    this.addUserClicked = !this.addUserClicked
  }
  checkAdminLoggedIn() {
    var id = this.myStorage.getItem("ADMIN_ID")
    var key = this.myStorage.getItem("ADMIN_KEY")
    if (id && key) {
      this.admin.id = Number(id);
      this.admin.pin = Number(key);
      console.log(this.admin)
      this.rs.logIn(this.admin).subscribe(
        (response) => {
          console.log(response)
          var result = JSON.parse(JSON.stringify(response))
          if (result['result'] == 2) {
            this.adminEntered = true
          } else {
            this.adminEntered = false
          }

        },
        (error) => {
          console.log("error " + error)
          this.adminEntered = false
        }
      )
    }
  }
  ngOnInit(): void {
    this.checkAdminLoggedIn()
  }
  loggedInTrigger(data: Number) {
    this.adminEntered = data == 0
    console.log(this.adminEntered)
  }

}
