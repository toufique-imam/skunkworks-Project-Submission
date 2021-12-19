import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  hasAdmin = true
  constructor(private rs: RestService) {
    this.checkAdmin()
  }

  ngOnInit(): void {

  }
  checkAdmin() {
    this.rs.checkAdmin().subscribe(
      (response) => {
        console.log("response " + response)
        if (response == true) this.hasAdmin = true
        else this.hasAdmin = false
        this.hasAdmin = !this.hasAdmin
      },
      (error) => {
        console.log("error " + error)
      }
    )
  }

  roomClick(roomNumber:Number){

  }


}
