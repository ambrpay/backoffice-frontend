import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ERC20Validator } from './directives/erc20.directive';
import { BTCValidator } from './directives/btc.directive';
import { SessionService } from './services/session.service';
import { PaymentService } from './services/payment.service';
import { ClipboardModule } from 'ngx-clipboard';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './components/common/alert/alert.component';
import { AlertService } from './services/alert.service';
import { HeaderComponent } from './components/common/header/header.component';
import { CustomFormsModule } from 'ng4-validators';
import { BusinessUserRegistrationService } from './services/BusinessUserRegistration.service';
import { SidemenuComponent } from './components/common/sidemenu/sidemenu.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { PaymentListComponent } from './components/payments/paymentList/paymentList.component';
import { SubscriptionPlansService } from './services/subscriptionPlan.service';
import { SubscriptionPlanComponent } from './components/subscriptionPlan/subscriptionPlan/subscriptonPlan.component';
import { SubscriptionPlanListComponent } from './components/subscriptionPlan/subscriptionPlanList/subscriptionPlanList.component';
import { BusinessEditComponent } from './components/business/businessEdit/businessEdit.component';
import { BusinesssService } from './services/business.service';
import { BusinessViewComponent } from './components/business/businessView/businessView.component';
import { BusinessUserComponent } from './components/businessUser/BusinessUser/businessUser.component';
import { BusinessUsersService } from './services/businessUser.service';
import { BusinessUserListComponent } from './components/businessUser/BusinessUserList/businessUserList.component';
import { ChangePasswordComponent } from './components/businessUser/changePassword/changePassword.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    SubscriptionPlanComponent,
    BusinessEditComponent,
    HeaderComponent,
    SubscriptionPlanListComponent,
    ChangePasswordComponent,
    BusinessUserListComponent,
    BusinessUserComponent,
    BusinessViewComponent,
    PaymentListComponent,
    ERC20Validator,
    BTCValidator,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory ,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SessionService,
    AuthenticationService,
    BusinessUserRegistrationService,
    BusinessUsersService,
    BusinesssService,
    SubscriptionPlansService,
    AlertService,
    AuthGuard,
    PaymentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
