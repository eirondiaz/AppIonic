import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://127.0.0.1:8000/api'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser(token) {
    return this.http.get<any>(this.URL + '/user?token=' + token)
  }

  signUp(user) {
    return this.http.post<any>(this.URL + '/registrar', user)
  }

  signIn(user) {
    return this.http.post<any>(this.URL + '/login', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logOut() {     
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  /*updateData(idd, user) {
    return this.http.put<any>(this.URL + '/editar/' + idd, user)
  }*/

  upData(idd, user) {
    return this.http.put<any>(this.URL + '/editar/' + idd, user)
  }

  updatePass(user) {
    return this.http.put<any>(this.URL + '/changepass/' + localStorage.getItem('token'), user)
  }
}
