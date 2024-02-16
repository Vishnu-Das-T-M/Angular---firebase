import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"angularcrudfirebase-2ce84","appId":"1:662831298501:web:575d7c2243e82292d0fdac","storageBucket":"angularcrudfirebase-2ce84.appspot.com","apiKey":"AIzaSyC9HS2SiFQGt4BtBKnUo8Ek2ORuQt0YotU","authDomain":"angularcrudfirebase-2ce84.firebaseapp.com","messagingSenderId":"662831298501"}))), importProvidersFrom(provideFirestore(() => getFirestore())),
  ]
};
