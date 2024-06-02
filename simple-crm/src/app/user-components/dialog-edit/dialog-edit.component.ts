import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FirebaseServiceComponent } from '../../shared/firebase-service/firebase-service.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-edit',
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
  providers: [FirebaseServiceComponent],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss',
})
export class DialogEditComponent implements OnInit {
  user: User = new User();
  userId: string = '';

  constructor(
    private firebaseService: FirebaseServiceComponent,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogEditComponent>,
  ) {}

  ngOnInit(): void {
  }

  editUser() {
    this.firebaseService.updateUser(this.user, this.userId);
  }
}
