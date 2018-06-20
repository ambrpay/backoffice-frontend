
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { BusinessUser } from '../models/BusinessUser';




@Injectable()
export class BusinessUsersService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  get(): Observable<BusinessUser[]>  {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers`;
    return this.http.get<BusinessUser[]>(url, { headers: headers});
  }

  getOne(id: number): Observable<BusinessUser> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers/${id}`;
    return this.http.get<BusinessUser>(url, { headers: headers});
  }

  delete(id: number): Observable<BusinessUser> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers/${id}`;
    return this.http.delete<BusinessUser>(url, { headers: headers});
  }

  update(businessUser: BusinessUser): Observable<BusinessUser> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers/${businessUser.id}`;
    return this.http.put<BusinessUser>(url, businessUser , { headers: headers});
  }

  updatePassword(businessUser: BusinessUser, currentPassword: string): Observable<BusinessUser> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const data = {
        businessUser: businessUser,
        password: currentPassword,
        email: user.email
    };
   // console.log(data);
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers/${businessUser.id}/changepassword`;
    return this.http.put<BusinessUser>(url, data , { headers: headers});
  }

  create(businessUser: BusinessUser): Observable<BusinessUser> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/businessusers`;
    console.log(businessUser);
    return this.http.post<BusinessUser>(url, businessUser , { headers: headers});
  }

}
