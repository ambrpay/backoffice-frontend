import { Component,  } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService
    ) {}

  private logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
