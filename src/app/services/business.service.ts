
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { Business } from '../models/Business';
import { BusinessUser } from '../models/BusinessUser';




@Injectable()
export class BusinesssService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}


  getOne(id: number): Observable<Business> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}`;
    return this.http.get<Business>(url, { headers: headers});
  }

  update(business: Business): Observable<Business> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}`;
    return this.http.put<Business>(url, business , { headers: headers});
  }

}
