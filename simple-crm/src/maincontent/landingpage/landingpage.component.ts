import { Component } from '@angular/core';
import { DashboardComponent } from '../../app/dashboard-components/dashboard/dashboard.component';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
