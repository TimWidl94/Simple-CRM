import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { UserDetailComponent } from './user-components/user-detail/user-detail.component';
import { UserComponent } from './user-components/user/user.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
];
