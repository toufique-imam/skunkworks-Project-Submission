import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  allUserUrl: string = "http://127.0.0.1:5000/getAllUser";

  constructor(private http: HttpClient) { }

  readWeather() {
    return this.http.get<User[]>(this.allUserUrl);
  }
}
