import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretoService {

  private URL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  getSecretos() {
    return this.http.get<any>(this.URL + '/secreto?token=' + localStorage.getItem('token')) 
  }

  createSecreto(secreto) {
    return this.http.post<any>(this.URL + '/secreto', secreto)
  }

  deleteSecreto(id) {
    return this.http.delete<any>(this.URL + '/secreto/' + id + '?token=' + localStorage.getItem('token'))
  }
}
