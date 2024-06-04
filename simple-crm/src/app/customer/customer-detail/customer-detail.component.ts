import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceComponent } from '../../shared/services/firebase-service/firebase-service.component';
import { onSnapshot } from 'firebase/firestore';
import { Customer } from '../../../models/customer.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from '../../user-components/dialog-edit/dialog-edit.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { RouterLink } from '@angular/router';
import { DateComponent } from '../../shared/date/date.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    DialogEditComponent,
    RouterLink,
    CommonModule,
  ],
  providers: [FirebaseServiceComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public firebaseService: FirebaseServiceComponent,
    public dialog: MatDialog
  ) {}

  private datesSubscription: Subscription | null = null;
  customerId: string = '';
  customer: any;
  dates: any[] = [];
  nameToCheck: string = '';
  datesCustomer: string [] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.customerId = params['id']));
    this.getCustomer();

    this.datesSubscription = this.firebaseService.dates$.subscribe((dates) => {
      this.dates = dates;
      console.log('customer-detail.component', this.dates)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.datesSubscription) {
      this.datesSubscription.unsubscribe();
    }
  }

  getCustomer() {
    let docRef = this.firebaseService.getSingleCustomerRef(
      'customer',
      this.customerId
    );
    this.customer = onSnapshot(docRef, (customerData) => {
      let customer = customerData.data();
      this.customer = new Customer(customer);
      // console.log('single user Data', this.customer);
    });
  }

  editMenu() {
    const dialog = this.dialog.open(CustomerEditComponent); //* Zuweisung des Users in die neue Componente *//
    dialog.componentInstance.customer = new Customer(
      this.firebaseService.getCustomerJson(this.customer)
    );
    dialog.componentInstance.customerId = this.customerId;
  }

  newDate() {
    const dialog = this.dialog.open(DateComponent);
  }

  getDatesFromCustomer() {
    this.dates.forEach((element) => {
      this.datesCustomer.push()
    })
  }
}
