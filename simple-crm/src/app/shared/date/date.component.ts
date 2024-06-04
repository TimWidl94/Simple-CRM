import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { Date } from '../../../models/date.class';
import { FirebaseServiceComponent } from '../firebase-service/firebase-service.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
  selector: 'app-date',
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
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
  ],
  providers: [provideNativeDateAdapter(), FirebaseServiceComponent],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent implements OnInit {
  constructor(public firebaseService: FirebaseServiceComponent) {
  }

  ngOnInit(): void {}
  selectedOption: string = '';
  date = new Date();

  users = this.firebaseService.users;

  usersList = new FormControl('');

  saveDate() {
    this.firebaseService.addDate(
      this.firebaseService.setDateObject(this.date, this.date.id),
      'date'
    );
    console.log('date', this.firebaseService.dates);
  }

  onSelectionChange(event: any) {
    if (event.value === 'online') {
      this.date.onlineCall = true;
    } else if (event.value === 'personal') {
      this.date.onlineCall = false;
    }
  }
}
