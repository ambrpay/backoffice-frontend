import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { BusinessUserRegistrationService } from '../../../services/BusinessUserRegistration.service';
import { PasswordValidator } from '../../../validators/password.validator';
import { CustomValidators } from 'ng4-validators';
import { Business } from '../../../models/Business';
import { EditMode } from '../../common/crudMode.enum';
import { BusinessUser, BusinessUserType } from '../../../models/BusinessUser';
import { BusinessUsersService } from '../../../services/businessUser.service';
import { HttpEvent } from '@angular/common/http';
import { SessionService } from '../../../services/session.service';

@Component({templateUrl: 'changePassword.component.html'})

export class ChangePasswordComponent implements OnInit {
    private formG: FormGroup;
    private loading = false;
    private submitted = false;
    private businessUser: BusinessUser;

    private sub: any;
    private id: number;

    constructor(
        private formBuilder: FormBuilder,
        private businessUsersService: BusinessUsersService,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
      this.formG = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), PasswordValidator.strong]],
        currentPassword: ['', [Validators.required]]
      });

      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        if (!!this.id) {
          this.load();
        } else {
          this.alertService.error('User could not be loaded', true);
          this.router.navigate([`/businessuser`]);
        }
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
        const businessUser: BusinessUser = new BusinessUser();
        businessUser.password = val.password;
        this.update(businessUser, val.currentPassword);
    }

    create(businessUser: BusinessUser) {
      this.loading = true;
      this.businessUsersService.create(businessUser)
          .pipe(first())
          .subscribe(
            (data: BusinessUser) => {
                  this.alertService.success('Save successful', true);
                  this.router.navigate([`/businessuser`]);
              },
              error => {
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    update(businessUser: BusinessUser, currentPassword: string) {
      this.loading = true;
      businessUser.id = this.id;
      businessUser.businessid = this.sessionService.getUser().businessid;
      this.businessUsersService.updatePassword(businessUser, currentPassword)
          .pipe(first())
          .subscribe(
              (data: BusinessUser) => {
                  this.alertService.success('Update Successful', true);
                  this.router.navigate([`/businessuser`]);
              },
              error => {
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    load() {
      this.businessUsersService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: BusinessUser) => {
                  this.businessUser = data;
              },
              error => {
                  this.alertService.error(error.error.message);
              });
    }

}
