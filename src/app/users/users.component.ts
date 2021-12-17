import { Component, OnInit } from '@angular/core';
import { RestService } from '../Services/rest.service';

import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User = {
    id: 1,
    fname: "testF",
    lname: "testL",
    designation: "TestD",
    address: "TestAddress",
    phone: "TestNumber",
    email: "test@gmail.com",
    pin: 1234,
    role: 0,
    //update - able
    roomEnter: [-1, -1, -1],
    roomExit: [-1, -1, -1],

    currentRoom: -1,
    enterTime: -1,
    totalTime: 0
  }

  users: User[] = [];

  constructor(private rs: RestService) { }
  selectedUser? : User
  onSelect(user:User){
    this.selectedUser = user
  }
  ngOnInit() {
    this.rs.readWeather().subscribe(
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

}
