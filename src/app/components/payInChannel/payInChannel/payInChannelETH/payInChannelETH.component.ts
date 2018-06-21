import { Component } from '@angular/core';
import { PayInChannelComponent } from '../payInChannel.component';
import { FormBuilder, Validators } from '@angular/forms';
import { PayInChannelService } from '../../../../services/payInChannel.service';
import { SessionService } from '../../../../services/session.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { PayInChannel } from '../../../../models/PayInChannel';

@Component({templateUrl: 'component.html'})

export class PayInChannelETHComponent extends PayInChannelComponent {

  constructor(
    formBuilder: FormBuilder,
    payInChannelService: PayInChannelService,
    sessionService: SessionService,
    router: Router,
    route: ActivatedRoute,
    alertService: AlertService) {
      super(formBuilder,
        payInChannelService,
        sessionService,
        router,
        route,
        alertService);
    }

    afterOnInit() {
      this.formG  = this.formBuilder.group({
        wallet: ['', Validators.required]
      });
    }

    extractData(val): PayInChannel {
      const payInChannel: PayInChannel = new PayInChannel();
      payInChannel.currency = 'ETH';
      payInChannel.data = JSON.stringify({
        wallet: val.wallet
      });
      return payInChannel;
    }

    setData(data: any) {
      console.log(data);
      data.data = JSON.parse(data.data);
      this.f.wallet.setValue(data.data.wallet);
    }

}
