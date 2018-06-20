
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { mergeMap } from 'rxjs/operators';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { BusinessUser } from '../models/BusinessUser';




@Injectable()
export class SubscriptionPlansService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  get(): Observable<SubscriptionPlan[]>  {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/subscriptionplans`;
    return this.http.get<SubscriptionPlan[]>(url, { headers: headers});
  }

  getOne(id: number): Observable<SubscriptionPlan> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/subscriptionplans/${id}`;
    return this.http.get<SubscriptionPlan>(url, { headers: headers});
  }

  delete(id: number): Observable<SubscriptionPlan> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers  = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/subscriptionplans/${id}`;
    return this.http.delete<SubscriptionPlan>(url, { headers: headers});
  }

  update(subscriptionplan: SubscriptionPlan): Observable<SubscriptionPlan> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/subscriptionplans/${subscriptionplan.id}`;
    return this.http.put<SubscriptionPlan>(url, subscriptionplan , { headers: headers});
  }

  create(subscriptionplan: SubscriptionPlan): Observable<SubscriptionPlan> {
    const user: BusinessUser = this.sessionService.getUser();
    const headers = this.sessionService.getAuthHeaders();
    const url = `http://localhost:3000/api/businesses/${user.businessid}/subscriptionplans`;
    console.log(subscriptionplan);
    return this.http.post<SubscriptionPlan>(url, subscriptionplan , { headers: headers});
  }

}
