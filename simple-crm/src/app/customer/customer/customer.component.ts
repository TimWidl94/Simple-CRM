import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FirebaseServiceComponent } from '../../shared/services/firebase-service/firebase-service.component';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseServiceComponent
  ) {}

  customers = this.firebaseService.customers;

  ngOnInit(): void {
    console.log('date', this.firebaseService.dates);
  }


  openDialog(){
    this.dialog.open(DialogAddCustomerComponent);
    console.log(this.customers);
  }
}
