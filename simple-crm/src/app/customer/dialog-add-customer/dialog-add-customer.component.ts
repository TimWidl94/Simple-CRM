import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseServiceComponent } from '../../shared/services/firebase-service/firebase-service.component';
import { Customer } from '../../../models/customer.class';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter(), FirebaseServiceComponent],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss',
})
export class DialogAddCustomerComponent {
  constructor(private firebaseService: FirebaseServiceComponent) {}

  customer = new Customer();
  loading = false;

  saveCustomer() {
    this.loading = true;
    this.firebaseService.addCustomer(
      this.firebaseService.setCustomerObject(this.customer, this.customer.id),
      'customer'
    );
    console.log('customer', this.customer);
  }
}
