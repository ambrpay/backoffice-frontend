import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { BusinessUsersService } from '../../../services/businessUser.service';
import { BusinessUser } from '../../../models/BusinessUser';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';

@Component({
  templateUrl: './businessUserList.component.html'
})
export class BusinessUserListComponent implements OnInit {

  private businessUsers: BusinessUser[];
  private currentUserId: number;
  constructor(
    private businessUserService: BusinessUsersService,
    private sessionService: SessionService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.currentUserId = this.sessionService.getUser().id;
    this.businessUserService.get()
    .subscribe((businessUser: BusinessUser[]) => {
      console.log(businessUser);
      this.businessUsers = businessUser;
    });
  }

  onDelete(id: number) {
    this.businessUserService.delete(id)
        .pipe(first())
        .subscribe(
            (data: BusinessUser) => {
                this.alertService.success('Delete Successful', true);
                this.router.navigate([`/businessuser`]);
            },
            error => {
                console.log(error);
                this.alertService.error(error.error.message);
            });
  }

}
