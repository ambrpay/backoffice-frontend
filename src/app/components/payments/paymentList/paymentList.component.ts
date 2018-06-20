import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  templateUrl: './paymentList.component.html'
})
export class PaymentListComponent implements OnInit {

  private payments: any;
  constructor(
    private _paymentProvoders: PaymentService,
  ) {}

  ngOnInit() {
    this._paymentProvoders.getPayments()
    .subscribe((payments) => {
      this.payments = payments;
    });
  }

}
