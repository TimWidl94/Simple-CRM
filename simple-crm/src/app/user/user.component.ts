import { FirebaseApp } from './../../../node_modules/@angular/fire/app/app.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { FirebaseServiceComponent } from '../shared/firebase-service/firebase-service.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule
  ],
  providers: [FirebaseServiceComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceComponent) {}

  users = this.firebaseService.users;

  ngOnInit(): void {
    console.log(this.firebaseService.users)
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
    console.log(this.users)
  }
}
