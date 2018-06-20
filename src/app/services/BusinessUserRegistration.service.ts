
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { BusinessUser } from '../models/BusinessUser';


@Injectable()
export class BusinessUserRegistrationService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  create(data: BusinessUser): Observable<BusinessUser> {
    return this.http.post<BusinessUser>(`http://localhost:3000/api/businessusers`, data);
  }

}
