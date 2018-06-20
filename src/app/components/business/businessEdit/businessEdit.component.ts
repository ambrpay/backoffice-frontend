import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { BusinessUserRegistrationService } from '../../../services/BusinessUserRegistration.service';
import { Business } from '../../../models/Business';
import { SessionService } from '../../../services/session.service';
import { CustomValidators } from 'ng4-validators';
import { BusinesssService } from '../../../services/business.service';

@Component({templateUrl: 'businessEdit.component.html'})

export class BusinessEditComponent implements OnInit {
    private formG: FormGroup;
    private loading = false;
    private submitted = false;

    private id: number;

    constructor(
        private formBuilder: FormBuilder,
        private businessService: BusinesssService,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
        this.id = this.sessionService.getUser().businessid;

        if (!!this.id) {
          this.load();
        } else {
          this.alertService.error(`Business with id: ${this.id} can not be loaded`, true);
          this.router.navigate([`/business`]);
        }

        this.formG = this.formBuilder.group({
          name: ['', [Validators.required]],
          taxcode: ['', [Validators.required]],
          website: ['', [Validators.required, CustomValidators.url]],
          phone: ['', [Validators.required]],
          address: ['', [Validators.required]],
          city: ['', [Validators.required]],
          zip: ['', [Validators.required]],
          country: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.formG.controls; }


    onSubmit() {
        this.submitted = true;
        if (this.formG.invalid) {
            return;
        }

        const val = this.formG.value;
        const business: Business = new Business();
        business.name = val.name;
        business.taxcode = val.taxcode;
        business.website = val.website;
        business.phone = val.phone;
        business.address = val.address;
        business.city = val.city;
        business.zip = val.zip;
        business.country = val.country;
        this.update(business);
    }

    update(business: Business) {
      console.log(business);
      this.loading = true;
      business.id = this.id;
      this.businessService.update(business)
          .pipe(first())
          .subscribe(
              (data: Business) => {
                  console.log('what was updated', data);
                  this.alertService.success('Update Successful', true);
                  this.router.navigate([`/business`]);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    load() {
      this.businessService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: Business) => {
                  console.log(data);
                  this.f.name.setValue(data.name);
                  this.f.taxcode.setValue(data.taxcode);
                  this.f.website.setValue(data.website);
                  this.f.phone.setValue(data.phone);
                  this.f.address.setValue(data.address);
                  this.f.city.setValue(data.city);
                  this.f.zip.setValue(data.zip);
                  this.f.country.setValue(data.country);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
              });
    }

}
