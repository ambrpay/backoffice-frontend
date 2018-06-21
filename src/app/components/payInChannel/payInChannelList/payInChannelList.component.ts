import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { PayInChannelService } from '../../../services/payInChannel.service';
import { PayInChannel } from '../../../models/PayInChannel';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './payInChannelList.component.html'
})
export class PayInChannelListComponent implements OnInit {

  private payInChannels: PayInChannel[];
  private supportedCurrencies = ['ETH', 'NEO', 'BTC', 'EUR', 'USD', 'CHF'];
  private currency = 'ETH';
  constructor(
    private payInChannelService: PayInChannelService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.payInChannelService.get()
    .subscribe((payInChannels: PayInChannel[]) => {
      console.log(payInChannels);
      this.payInChannels = payInChannels;
      this.payInChannels = payInChannels.map( (x: PayInChannel) => {
        x.data = JSON.parse(x.data);
        return x;
       });
    });
  }

  getKeys(data: any) {
    return Object.keys(data);
  }

  setCurrency(cur) {
    this.currency = cur;
  }

  onDelete(id: number) {
    this.payInChannelService.delete(id)
        .pipe(first())
        .subscribe(
            (data: PayInChannel) => {
                this.alertService.success('Delete Successful', true);
                this.router.navigate([`/payinchannel`]);
            },
            error => {
                console.log(error);
                this.alertService.error(error.error.message);
            });
  }

}
