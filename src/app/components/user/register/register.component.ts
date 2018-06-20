import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { BusinessUserRegistrationService } from '../../../services/BusinessUserRegistration.service';
import { PasswordValidator } from '../../../validators/password.validator';
import { CustomValidators } from 'ng4-validators';
import { BusinessUser } from '../../../models/BusinessUser';
import { Business } from '../../../models/Business';

@Component({templateUrl: 'register.component.html'})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private businessUserRegistrationService: BusinessUserRegistrationService,
        private router: Router,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), PasswordValidator.strong]],
            businessName: ['', [Validators.required]],
            businessTaxcode: ['', [Validators.required]],
            businessWebsite: ['', [Validators.required, CustomValidators.url]],
            businessPhone: ['', [Validators.required]],
            businessAddress: ['', [Validators.required]],
            businessCity: ['', [Validators.required]],
            businessZip: ['', [Validators.required]],
            businessCountry: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const val = this.registerForm.value;
        const businessUser: BusinessUser = new BusinessUser();
        businessUser.business = new Business();
        businessUser.title = val.title;
        businessUser.firstName = val.firstName;
        businessUser.lastName = val.lastName;
        businessUser.email = val.email;
        businessUser.password = val.password;
        businessUser.userType = 1;
        businessUser.business.name = val.businessName;
        businessUser.business.taxcode = val.businessTaxcode;
        businessUser.business.website = val.businessWebsite;
        businessUser.business.phone = val.businessPhone;
        businessUser.business.address = val.businessAddress;
        businessUser.business.city = val.businessCity;
        businessUser.business.zip = val.businessZip;
        businessUser.business.country = val.businessCountry;

        this.loading = true;
        this.businessUserRegistrationService.create(businessUser)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}
