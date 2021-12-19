import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;
  constructor() { }

  ngOnInit(): void {
  }
  getAccessTime(seconds: number) {
    if (seconds == -1) seconds = 0
    return new Date(seconds * 1000)
  }
  getTotalTime(seconds: number) {

    var months = (seconds / 2592000).toFixed(2)
    var days = ((seconds % 2592000) / 86400).toFixed(2)
    var hours = ((seconds % 86400) / 3600).toFixed(2)
    var minute = ((seconds % 3600) / 60).toFixed(2)
    var second = ((seconds % 60)).toFixed(2)
    return months + " Months " + days + " Days " + hours + " Hours " + minute + " Minutes " + second + " seconds"
  }

}
