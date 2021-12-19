import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestService } from 'src/app/Services/rest.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-suite-cmp',
  templateUrl: './suite-cmp.component.html',
  styleUrls: ['./suite-cmp.component.css']
})
//when trying to enter , get id and pin , if pin is correct , check his current room 
// if room is same do nothin
// if room is -1 mark this as roomEntered and update
// if room is another say you have to exit first
// on exit click update exit time and room=-1
export class SuiteCmpComponent implements OnInit {
  id = -1
  model = new User()
  message = ""
  enterOk = false
  exitOk = false
  accessOk = true
  constructor(private router: ActivatedRoute, private rs: RestService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id']
      console.log("suite" + this.id)
      this.message = "You are trying to access " + this.id
    });
  }
  onSubmit(userForm: any) {
    this.model.currentRoom = this.id - 1;
    this.rs.authenticateUser(this.model).subscribe(
      (response) => {
        console.log(response)
        var result = JSON.parse(JSON.stringify(response))
        if (result["result"] == 0) {
          this.model = result["user"]
          if (this.model.currentRoom == -1) {
            this.enterOk = true
            this.exitOk = false
            this.accessOk = false
            this.message = "You can enter suite " + this.id
          } else if (this.model.currentRoom == this.id - 1) {
            this.exitOk = true
            this.enterOk = false
            this.accessOk = false
            this.message = "You can exit suite " + this.id
          }
          else {
            this.message = "you cant enter into suite " + this.id + "now as you haven't exited from suite " + (this.model.currentRoom + 1)
          }
        } else {
          this.message = "Invalid pin/id"
        }
      },
      (error) => {
        console.log("error " + error)
      }
    )
  }
  onClick() {
    console.log(this.model)
    console.log(this.id)
    if (this.accessOk == false) {
      if (this.model.currentRoom == -1 || this.model.currentRoom == this.id - 1) {
        var prev = this.model.currentRoom
        this.model.currentRoom = this.id - 1
        this.rs.suiteAccess(this.model).subscribe(
          (response) => {
            console.log("this" + response)
            if (response == -2) {
              this.message = "Invalid pin/id"
            } else if (response == -1) {
              this.message = "you cant enter into suite " + this.id + "now as you haven't exited from suite " + (prev + 1)
            }
            else if (response == 0) {
              this.model.currentRoom = this.id - 1
              this.message = "You have entered suite " + this.id
              this.exitOk = true
              this.enterOk = false
              this.accessOk = false
            }
            else {
              this.exitOk = false
              this.enterOk = false
              this.accessOk = true
              this.model.currentRoom = - 1
              this.message = "You have exited suite " + this.id
            }
          },
          (error) => {
            console.log("error " + error)
          }
        )
      }
    }
  }

}
