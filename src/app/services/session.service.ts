import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { BusinessUser } from '../models/BusinessUser';



@Injectable()
export class SessionService {

  private language: any;
  constructor(private http: HttpClient) {}


  get() {
    return JSON.parse(localStorage.getItem('authToken'));
  }

  getAuthHeaders(): HttpHeaders {
    return  new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.get(),
      });
  }

  getUser(): BusinessUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  setLanguage(language: string) {
    this.language = language;
  }

  getlanguage() {
    return this.language;
  }

}
