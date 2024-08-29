import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { MovDetailsComponent } from './mov-details/mov-details.component';
import { MulDetailsComponent } from './mul-details/mul-details.component';
import { PaymentComponent } from './payment/payment.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { IdGuard } from './guards/IdGuard';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  { path: 'mul-details/:id', component: MulDetailsComponent, canActivate:[IdGuard] },
  { path: 'mov-details/:id', component: MovDetailsComponent, canActivate:[IdGuard] },
  { path: 'ticket-booking/:id', component: TicketBookingComponent, canActivate:[IdGuard]  },
  { path: 'ticket-confirm', component: ConfirmBookingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: '**', component: ErrorComponent }, // Wildcard route for 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
