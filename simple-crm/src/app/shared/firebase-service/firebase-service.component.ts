import { Component, inject } from '@angular/core';
import { Firestore, query } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { User } from '../../../models/user.class';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-firebase-service',
  standalone: true,
  imports: [],
  templateUrl: './firebase-service.component.html',
  styleUrl: './firebase-service.component.scss',
})
export class FirebaseServiceComponent {
  firestore: Firestore = inject(Firestore);
  user: User[] = [];
  unsubUser;

  constructor() {
    this.unsubUser = this.subUserList();
  }

  ngonDestroy() {
    this.unsubUser();
  }

  getUserJson(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  subUserList() {
    const q = query(this.getUserRef());
    return onSnapshot(q, (list) => {
      this.user = [];
      list.forEach((element) => {
        this.user.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }


  async addUser(user: User, colId: "user"){
    if(colId == 'user'){
      await addDoc(this.getUserRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef);
      });
    }
  }
}