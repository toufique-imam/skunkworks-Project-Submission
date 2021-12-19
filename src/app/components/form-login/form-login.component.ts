import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { User } from '../../user';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  model = new User();
  @Output() newItemEvent = new EventEmitter<number>();
  myStorage = window.sessionStorage
  constructor(private rs: RestService) { }

  ngOnInit(): void {
    //
  }
  onSubmit(userForm: any) {
    this.rs.logIn(this.model).subscribe(
      (response) => {
        console.log(response)
        var result = JSON.parse(JSON.stringify(response))
        if (result['result'] == 2) {
          this.model = result['admin']
          this.myStorage.setItem("ADMIN_ID", this.model.id.toString())
          this.myStorage.setItem("ADMIN_KEY", this.model.pin.toString())
          this.newItemEvent.emit(0);
        } else {
          this.newItemEvent.emit(1)
        }

      },
      (error) => {
        console.log("error " + error)
        this.newItemEvent.emit(1)
      }
    )
  }
  newUser() {
    this.model = new User()
  }

}
