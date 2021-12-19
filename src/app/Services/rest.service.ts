import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  rootApi = "http://127.0.0.1:5000"
  allUserUrl: string = this.rootApi + "/getAllUser";
  checkIdUrl: string = this.rootApi + "/checkID?id=";
  addUserUrl: string = this.rootApi + "/AddUser";
  checkAdminUrl: string = this.rootApi + "/checkAdmin";
  loginUrl: string = this.rootApi + "/login";
  adminCheckUrl: string = this.rootApi + "/adminLoggedIn";

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(this.allUserUrl);
  }
  checkID(id: Number) {
    return this.http.get<boolean>(this.checkIdUrl + id)
  }
  addUser(user: User) {
    return this.http.post(this.addUserUrl, JSON.stringify(user))
  }
  checkAdmin() {
    return this.http.get<boolean>(this.checkAdminUrl)
  }
  logIn(user: User) {
    return this.http.post(this.loginUrl, JSON.stringify(user))
  }
  adminLoggedIn() {
    return this.http.get<boolean>(this.adminCheckUrl)
  }
}
