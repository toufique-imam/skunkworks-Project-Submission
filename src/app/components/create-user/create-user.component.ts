import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../user';
import { RestService } from '../../Services/rest.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<number>();
  model = new User()
  idError = "Id is requied"
  submitted = false;


  onSubmit(userForm: any) {
    console.log(userForm.form)
    this.submitted = true;
    this.rs.checkID(this.model.id).subscribe(
      (response) => {
        console.log(response)
        if (response == true) {
          let control = userForm.controls['id'];
          control.setErrors({ backend: { someProp: "Invalid Data" }, incorrect: true });
          this.idError = "ID already exists"
        } else {
          //todo post a request to add user
          console.log(JSON.stringify(this.model))
          this.addUser()
        }
      },
      (error) => {
        console.log("no data found" + error)
      }
    )

  }

  constructor(private rs: RestService) { }

  ngOnInit(): void {
  }
  newUser() {
    this.model = new User();
  }
  addUser() {
    this.rs.addUser(this.model).subscribe(
      (response) => {
        console.log("response " + response)
        this.newItemEvent.emit(0);
      },
      (error) => {
        console.log("error " + error)
        this.newItemEvent.emit(1)
      }
    )
  }
}
