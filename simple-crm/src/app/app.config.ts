import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-6535c',
        appId: '1:769043058062:web:4794fc59b2a55191cba8df',
        storageBucket: 'simple-crm-6535c.appspot.com',
        apiKey: 'AIzaSyAg-sEEMQx5zpblsno0ZZGjSJCB6pbsOJU',
        authDomain: 'simple-crm-6535c.firebaseapp.com',
        messagingSenderId: '769043058062',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
