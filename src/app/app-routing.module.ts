import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PaymentListComponent } from './components/payments/paymentList/paymentList.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SubscriptionPlanComponent } from './components/subscriptionPlan/subscriptionPlan/subscriptonPlan.component';
import { SubscriptionPlanListComponent } from './components/subscriptionPlan/subscriptionPlanList/subscriptionPlanList.component';
import { BusinessEditComponent } from './components/business/businessEdit/businessEdit.component';
import { BusinessViewComponent } from './components/business/businessView/businessView.component';
import { BusinessUserComponent } from './components/businessUser/BusinessUser/businessUser.component';
import { BusinessUserListComponent } from './components/businessUser/BusinessUserList/businessUserList.component';
import { ChangePasswordComponent } from './components/businessUser/changePassword/changePassword.component';
import { PayInChannelListComponent } from './components/payInChannel/payInChannelList/payInChannelList.component';
import { PayInChannelComponent } from './components/payInChannel/payInChannel/payInChannel.component';
import { PayInChannelBTCComponent } from './components/payInChannel/payInChannel/payInChannelBTC/payInChannelBTC.component';
import { PayInChannelETHComponent } from './components/payInChannel/payInChannel/payInChannelETH/payInChannelETH.component';
import { PayInChannelNEOComponent } from './components/payInChannel/payInChannel/payInChannelNeo/payInChannelNEO.component';
import { PayInChannelCHFComponent } from './components/payInChannel/payInChannel/payInChannelCHF/payInChannelCHF.component';
import { PayInChannelUSDComponent } from './components/payInChannel/payInChannel/payInChannelUSD/payInChannelUSD.component';
import { PayInChannelEURComponent } from './components/payInChannel/payInChannel/payInChannelEUR/payInChannelEUR.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'payments',
    component: PaymentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscriptionplan',
    component: SubscriptionPlanListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscriptionplan/new',
    component: SubscriptionPlanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscriptionplan/edit/:id',
    component: SubscriptionPlanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'business/edit',
    component: BusinessEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'business',
    component: BusinessViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'businessuser/new',
    component: BusinessUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'businessuser/edit/:id',
    component: BusinessUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'businessuser/changepassword/:id',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'businessuser',
    component: BusinessUserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/BTC',
    component: PayInChannelBTCComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/BTC/:id',
    component: PayInChannelBTCComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/ETH',
    component: PayInChannelETHComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/ETH/:id',
    component: PayInChannelETHComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/NEO',
    component: PayInChannelNEOComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/NEO/:id',
    component: PayInChannelNEOComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/CHF',
    component: PayInChannelCHFComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/CHF/:id',
    component: PayInChannelCHFComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/USD',
    component: PayInChannelUSDComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/USD/:id',
    component: PayInChannelUSDComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/new/EUR',
    component: PayInChannelEURComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel/edit/EUR/:id',
    component: PayInChannelEURComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payinchannel',
    component: PayInChannelListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
