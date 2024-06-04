import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceComponent } from '../../shared/services/firebase-service/firebase-service.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customer.class';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-customer-edit',
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
    MatCardModule
  ],
  providers: [FirebaseServiceComponent],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseServiceComponent,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CustomerEditComponent>
  ) {}

  customer: Customer = new Customer();
  customerId: string = '';

  ngOnInit(): void {}

  editCustomer() {
    this.firebaseService.updateCustomer(this.customer, this.customerId);
  }
}
