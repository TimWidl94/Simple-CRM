import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceComponent } from '../shared/firebase-service/firebase-service.component';
import { onSnapshot } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule, DialogEditComponent],
  providers: [FirebaseServiceComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public firebaseService: FirebaseServiceComponent,
    public dialog: MatDialog,
  ) {}

  userId: string = '';
  user: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userId = params['id']));
    this.getUser();
  }

  getUser() {
    let docRef = this.firebaseService.getSingleUserRef('user', this.userId);
    this.user = onSnapshot(docRef, (userData) => {
      let user = userData.data();
      this.user = new User(user);
      console.log('single user Data', this.user);
    });
  }

  editMenu(){
    this.dialog.open(DialogEditComponent);
  }
}
