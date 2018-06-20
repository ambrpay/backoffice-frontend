import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { BusinessUserRegistrationService } from '../../../services/BusinessUserRegistration.service';
import { Business } from '../../../models/Business';
import { SessionService } from '../../../services/session.service';
import { BusinesssService } from '../../../services/business.service';

@Component({templateUrl: 'businessView.component.html'})

export class BusinessViewComponent implements OnInit {
    private id: number;
    private business: Business;

    constructor(
        private businessService: BusinesssService,
        private sessionService: SessionService,
        private router: Router,
        private alertService: AlertService) { }

    ngOnInit() {
        this.id = this.sessionService.getUser().businessid;

        if (!!this.id) {
          this.load();
          console.log('loading');
        } else {
          this.alertService.error(`Business with id: ${this.id} can not be loaded`, true);
          this.router.navigate([``]);
        }
    }

    // convenience getter for easy access to form fields
    get b() { return this.business; }

    load() {
      this.businessService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: Business) => {
                  console.log(data);
                  this.business = data;
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
              });
    }

}
