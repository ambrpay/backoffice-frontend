
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { BusinessUser } from '../models/BusinessUser';
import { Payment } from '../models/Payment';




@Injectable()
export class PaymentService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getPayments(): Observable<Payment> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/payments`;
    return this.http.get<Payment>(url,  { headers: headers});
  }

}
