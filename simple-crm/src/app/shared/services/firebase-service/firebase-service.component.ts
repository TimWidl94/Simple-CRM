import { Component, Injectable, inject } from '@angular/core';
import { Firestore, query } from '@angular/fire/firestore';
import { User } from '../../../../models/user.class';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { Customer } from '../../../../models/customer.class';
import { Date } from '../../../../models/date.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-firebase-service',
  standalone: true,
  imports: [],
  templateUrl: './firebase-service.component.html',
  styleUrl: './firebase-service.component.scss',
})
export class FirebaseServiceComponent {
  firestore: Firestore = inject(Firestore);


  private datesSubject = new BehaviorSubject<any[]>([]);
  dates$ = this.datesSubject.asObservable();
  public users: User[] = [];
  public customers: Customer[] = [];
  public dates: Date[] = [];
  unsubUser;
  unsubCustomer;
  unsubDate;

  constructor() {
    this.unsubUser = this.subUserList();
    this.unsubCustomer = this.subCustomerList();
    this.unsubDate = this.subDateList();
  }

  ngonDestroy() {
    this.unsubUser();
    this.unsubCustomer();
    this.unsubDate;
  }

  //* User *//

  getUserJson(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  subUserList() {
    const q = query(this.getUserRef());
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        this.users.push(this.setUserObject(element.data(), element.id));
      });
      // console.log(this.users);
    });
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }

  async addUser(user: User, colId: 'user') {
    if (colId == 'user') {
      await addDoc(this.getUserRef(), user)
        .catch((err) => {
          console.error(err);
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef);
        });
    }
  }

  getSingleUserRef(colId: string, userId: string) {
    return doc(collection(this.firestore, colId), userId);
  }

  async getUserJsonFromId(user: User) {
    if (user.id) {
      let docRef = this.getSingleUserRef('user', user.id);
      await updateDoc(docRef, this.getUserJson(user))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    }
  }

  async updateUser(user: User, userId: string) {
    if (userId) {
      let docRef = this.getSingleUserRef('user', userId);
      await updateDoc(docRef, this.getUserJson(user))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    }
  }

  //* Customer *//

  getSingleCustomerRef(colId: string, customerId: string) {
    return doc(collection(this.firestore, colId), customerId);
  }

  getCustomerJson(customer: Customer) {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      telefonNumber: customer.telefonNumber,
      street: customer.street,
      zipCode: customer.zipCode,
      city: customer.city,
      country: customer.country,
      customerNumber: customer.customerNumber,
    };
  }

  async addCustomer(customer: Customer, colId: 'customer') {
    if (colId == 'customer') {
      await addDoc(this.getCustomerRef(), customer)
        .catch((err) => {
          console.error(err);
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef);
        });
    }
  }

  getCustomerRef() {
    return collection(this.firestore, 'customer');
  }

  setCustomerObject(obj: any, id: string) {
    return {
      id: id || '',
      customerNumber: obj.customerNumber || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      telefonNumber: obj.telefonNumber || '',
      country: obj.country || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  subCustomerList() {
    const q = query(this.getCustomerRef());
    return onSnapshot(q, (list) => {
      this.customers = [];
      list.forEach((element) => {
        this.customers.push(this.setCustomerObject(element.data(), element.id));
      });
      // console.log(this.users);
    });
  }

  async updateCustomer(customer: Customer, customerId: string) {
    if (customerId) {
      let docRef = this.getSingleCustomerRef('customer', customerId);
      await updateDoc(docRef, this.getCustomerJson(customer))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    }
  }

  //* Date *//

  getSingleDateRef(colId: string, dateId: string) {
    return doc(collection(this.firestore, colId), dateId);
  }

  getDateJson(date: Date) {
    return {
      id: date.id,
      date: date.date,
      onlineCall: date.onlineCall,
      time: date.time,
      paricipant: {
        firstName: date.participant,
        lastName: date.participant
      },
    };
  }

  async addDate(date: Date, colId: 'date') {
    if (colId == 'date') {
      await addDoc(this.getDateRef(), date)
        .catch((err) => {
          console.error(err);
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef);
        });
    }
  }

  getDateRef() {
    return collection(this.firestore, 'date');
  }

  setDateObject(obj: any, id: string) {
    return {
      id: id || '',
      date: obj.date || '',
      onlineCall: obj.onlineCall || true,
      time: obj.time || '',
      participant: obj.participant || '',
    };
  }

  subDateList() {
    const q = query(this.getDateRef());
    return onSnapshot(q, (list) => {
      this.dates = [];
      list.forEach((element) => {
        this.dates.push(this.setDateObject(element.data(), element.id));
      });
      this.datesSubject.next(this.dates);
      // console.log('liste der Termine', this.dates);
    });
  }

  async updateDate(date: Date, dateId: string) {
    if (dateId) {
      let docRef = this.getSingleDateRef('date', dateId);
      await updateDoc(docRef, this.getDateJson(date))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    }
  }

  getDates(): Date[] {
    return this.dates;
  }
}
