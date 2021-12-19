import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RestService } from '../../Services/rest.service';


import { User } from '../../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() dataChanging!: Subject<boolean>;
  user = new User()

  users: User[] = [];

  constructor(private rs: RestService) { }
  selectedUser?: User
  onSelect(user: User) {
    this.selectedUser = user
  }
  ngOnInit() {
    this.getAll()
    this.dataChanging.subscribe(v => {
      if (v) {
        this.getAll()
      }
    });
  }
  getAll() {
    this.rs.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.users.forEach(user => {
          console.log(user)
        });
      },
      (error) => {
        console.log("no data found" + error)
      }
    )
  }
  test() {
    console.log("test called")
  }

}
