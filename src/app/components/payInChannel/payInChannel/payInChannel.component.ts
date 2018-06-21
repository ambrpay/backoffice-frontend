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
import { HttpEvent } from '@angular/common/http';
import { SessionService } from '../../../services/session.service';
import { PayInChannel } from '../../../models/PayInChannel';
import { PayInChannelService } from '../../../services/payInChannel.service';

export abstract class PayInChannelComponent implements OnInit {
    protected formG: FormGroup = null;
    protected loading = false;
    protected submitted = false;
    protected mode: EditMode;

    protected sub: any;
    protected id: number;

    private groups = {
      'ETH': this.formBuilder.group({
        currency: ['', Validators.required],
        wallet: ['', Validators.required]
      }),
      'NEO': this.formBuilder.group({
        currency: ['', Validators.required],
        wallet: ['', Validators.required]
      }),
      'BTC': this.formBuilder.group({
        currency: ['', Validators.required],
        wallet: ['', Validators.required]
      }),
      'EUR': this.formBuilder.group({
        currency: ['', Validators.required],
        iban: ['', Validators.required]
      }),
      'USD': this.formBuilder.group({
        currency: ['', Validators.required],
        bank: ['', Validators.required]
      }),
      'CHF': this.formBuilder.group({
        currency: ['', Validators.required],
        iban: ['', Validators.required]
      })
    };

    constructor(
        protected formBuilder: FormBuilder,
        protected payInChannelService: PayInChannelService,
        protected sessionService: SessionService,
        protected router: Router,
        protected route: ActivatedRoute,
        protected alertService: AlertService) { }

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
        this.afterOnInit();
    }

    abstract afterOnInit();

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
        const payInChannel = this.extractData(val);
        if (this.isEditMode()) {
          this.update(payInChannel);
        } else {
          this.create(payInChannel);
        }
    }

    abstract extractData(val: any): PayInChannel;


    create(payInChannel: PayInChannel) {
      this.loading = true;
      payInChannel.businessid = this.sessionService.getUser().businessid;
      this.payInChannelService.create(payInChannel)
          .pipe(first())
          .subscribe(
            (data: PayInChannel) => {
                  this.alertService.success('Save successful', true);
                  this.router.navigate([`/payinchannel`]);
              },
              error => {
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    update(payInChannel: PayInChannel) {
      this.loading = true;
      payInChannel.id = this.id;
      payInChannel.businessid = this.sessionService.getUser().businessid;
      this.payInChannelService.update(payInChannel)
          .pipe(first())
          .subscribe(
              (data: PayInChannel) => {
                  this.alertService.success('Update Successful', true);
                  this.router.navigate([`/payinchannel`]);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    load() {
      this.payInChannelService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: PayInChannel) => {
                 this.setData(data);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
              });
    }

    abstract setData(data);

}
