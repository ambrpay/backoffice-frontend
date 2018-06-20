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

@Component({templateUrl: 'businessUser.component.html'})

export class BusinessUserComponent implements OnInit {
    private formG: FormGroup;
    private loading = false;
    private submitted = false;
    private mode: EditMode;

    private sub: any;
    private id: number;
    private userTypeKeys = Object.keys(BusinessUserType).filter(k => typeof BusinessUserType[k as any] === 'number');

    constructor(
        private formBuilder: FormBuilder,
        private businessUsersService: BusinessUsersService,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
      this.formG = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userType: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), PasswordValidator.strong]]
      });
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        if (!!this.id) {
          this.mode = EditMode.Edit;
          this.formG.removeControl('password');
          this.load();
        } else {
          this.mode = EditMode.New;
        }
      });

    }

    // convenience getter for easy access to form fields
    get f() { return this.formG.controls; }

    isEditMode() {
      return this.mode === EditMode.Edit;
    }

    getUserTypeValue(type: string) {
      return BusinessUserType[type];
    }

    onSubmit() {
        this.submitted = true;
        if (this.formG.invalid) {
            return;
        }

        const val = this.formG.value;
        const businessUser: BusinessUser = new BusinessUser();
        businessUser.title = val.title;
        businessUser.firstName = val.firstName;
        businessUser.lastName = val.lastName;
        businessUser.email = val.email;
        businessUser.password = val.password;
        businessUser.userType = val.userType;
        if (this.isEditMode()) {
          this.update(businessUser);
        } else {
          this.create(businessUser);
        }
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

    update(businessUser: BusinessUser) {
      this.loading = true;
      businessUser.id = this.id;
      businessUser.businessid = this.sessionService.getUser().businessid;
      this.businessUsersService.update(businessUser)
          .pipe(first())
          .subscribe(
              (data: BusinessUser) => {
                  this.alertService.success('Update Successful', true);
                  this.router.navigate([`/businessuser`]);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
    }

    load() {
      this.businessUsersService.getOne(this.id)
          .pipe(first())
          .subscribe(
              (data: BusinessUser) => {
                  this.f.title.setValue(data.title);
                  this.f.firstName.setValue(data.firstName);
                  this.f.lastName.setValue(data.lastName);
                  this.f.email.setValue(data.email);
                  this.f.userType.setValue(data.userType);
              },
              error => {
                  console.log(error);
                  this.alertService.error(error.error.message);
              });
    }

}
