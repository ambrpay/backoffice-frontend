import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { SubscriptionPlansService } from '../../../services/subscriptionPlan.service';
import { SubscriptionPlan } from '../../../models/SubscriptionPlan';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './subscriptionPlanList.component.html'
})
export class SubscriptionPlanListComponent implements OnInit {

  private subscriptionPlans: SubscriptionPlan[];
  constructor(
    private subscriptionPlansService: SubscriptionPlansService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.subscriptionPlansService.get()
    .subscribe((subscriptionPlan: SubscriptionPlan[]) => {
      console.log(subscriptionPlan);
      this.subscriptionPlans = subscriptionPlan;
    });
  }

  onDelete(id: number) {
    this.subscriptionPlansService.delete(id)
        .pipe(first())
        .subscribe(
            (data: SubscriptionPlan) => {
                this.alertService.success('Delete Successful', true);
                this.router.navigate([`/subscriptionplan`]);
            },
            error => {
                console.log(error);
                this.alertService.error(error.error.message);
            });
  }

}
