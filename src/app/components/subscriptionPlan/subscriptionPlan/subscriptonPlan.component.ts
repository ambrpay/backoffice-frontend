import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { BusinessUserRegistrationService } from '../../../services/BusinessUserRegistration.service';
import { PasswordValidator } from '../../../validators/password.validator';
import { CustomValidators } from 'ng4-validators';
import { BusinessUser } from '../../../models/BusinessUser';
import { Business } from '../../../models/Business';
import { EditMode } from '../../common/crudMode.enum';
import { SubscriptionPlan } from '../../../models/SubscriptionPlan';
import { SubscriptionPlansService } from '../../../services/subscriptionPlan.service';
import { HttpEvent } from '@angular/common/http';
import { SessionService } from '../../../services/session.service';

@Component({templateUrl: 'subscriptionPlan.component.html'})

export class SubscriptionPlanComponent implements OnInit {
    private formG: FormGroup;
    private loading = false;
    private submitted = false;
    private mode: EditMode;

    private sub: any;
    private id: number;

    private supportedCurrencies = ['CHF', 'EUR', '$', 'ETH', 'BTC'];

    constructor(
        private formBuilder: FormBuilder,
        private subscriptionPlansService: SubscriptionPlansService,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          if (!!this.id) {
            this.mode = EditMode.Edit;
            this.load();
          } else {
            this.mode = EditMode.New;
          }
        });
        this.formG = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            currency: ['', [Validators.required]],
            interval: ['', [Validators.required]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.formG.controls; }

    isEditMode() {
      return this.mode === EditMode.Edit;
    }


    onSubmit() {
        this.submitted = true;
        if (this.formG.invalid) {
            return;
        }

        const val = this.formG.value;
        const subscriptionPlan: SubscriptionPlan = new SubscriptionPlan();
        subscriptionPlan.title = val.title;
        subscriptionPlan.description = val.description;
        subscriptionPlan.price = val.price;
        subscriptionPlan.currency = val.currency;
        subscriptionPlan.interval = val.interval;
        if (this.isEditMode()) {
          this.update(subscriptionPlan);
        } else {
          this.create(subscriptionPlan);
        }
    }

    create(subscriptionPlan: SubscriptionPlan) {
      this.loading = true;
      subscriptionPlan.businessid = this.sessionService.getUser().businessid;
      this.subscriptionPlansService.create(subscriptionPlan)
          .pipe(first())
          .subscribe(
            (data: SubscriptionPlan) => {
                  this.alertService.success('Save successful', true);
                  this.router.navigate([`/subscriptionplan`]);
              },
              error => {
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    update(subscriptionPlan: SubscriptionPlan) {
      this.loading = true;
      subscriptionPlan.id = this.id;
      subscriptionPlan.businessid = this.sessionService.getUser().businessid;
      this.subscriptionPlansService.update(subscriptionPlan)
          .pipe(first())
          .subscribe(
              (data: SubscriptionPlan) => {
                  this.alertService.success('Update Successful', true);
                  this.router.navigate([`/subscriptionplan`]);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    load() {
      this.subscriptionPlansService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: SubscriptionPlan) => {
                  console.log(data);
                  this.f.title.setValue(data.title);
                  this.f.description.setValue(data.description);
                  this.f.price.setValue(data.price);
                  this.f.currency.setValue(data.currency);
                  this.f.interval.setValue(data.interval);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
              });
    }

}
