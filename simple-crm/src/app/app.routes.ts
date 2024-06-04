import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { UserDetailComponent } from './user-components/user-detail/user-detail.component';
import { UserComponent } from './user-components/user/user.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
];
