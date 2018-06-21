
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { BusinessUser } from '../models/BusinessUser';
import { PayInChannel } from '../models/PayInChannel';




@Injectable()
export class PayInChannelService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  get(): Observable<PayInChannel[]>  {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels`;
    return this.http.get<PayInChannel[]>(url, { headers: headers});
  }

  getOne(id: number): Observable<PayInChannel> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels/${id}`;
    return this.http.get<PayInChannel>(url, { headers: headers});
  }

  delete(id: number): Observable<PayInChannel> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels/${id}`;
    return this.http.delete<PayInChannel>(url, { headers: headers});
  }

  update(payInChannel: PayInChannel): Observable<PayInChannel> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels/${payInChannel.id}`;
    return this.http.put<PayInChannel>(url, payInChannel , { headers: headers});
  }

  updatePassword(payInChannel: PayInChannel, currentPassword: string): Observable<PayInChannel> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const data = {
        payInChannel: payInChannel,
        password: currentPassword,
        email: user.email
    };
   // console.log(data);
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels/${payInChannel.id}/changepassword`;
    return this.http.put<PayInChannel>(url, data , { headers: headers});
  }

  create(payInChannel: PayInChannel): Observable<PayInChannel> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payinchannels`;
    console.log(payInChannel);
    return this.http.post<PayInChannel>(url, payInChannel , { headers: headers});
  }

}
