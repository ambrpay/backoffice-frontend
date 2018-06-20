import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { AuthToken } from '../models/AuthToken';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
                private sessionService: SessionService) { }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/businessusers/login', { email: email, password: password })
            .pipe(map( (authToken: AuthToken) => {
                // login successful if there's a jwt token in the response
                if (authToken && authToken.token && authToken.businessUser) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(authToken.businessUser));
                    localStorage.setItem('authToken', JSON.stringify(authToken.token));
                }
                return authToken;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    }
}
