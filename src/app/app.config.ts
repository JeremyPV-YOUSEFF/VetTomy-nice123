import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MyPreset } from './present';

import localeEsPe from '@angular/common/locales/es-PE'

import { registerLocaleData } from '@angular/common';
import { ToastService } from './shared/alerts/toast.service';
import { MessageService } from 'primeng/api';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
registerLocaleData(localeEsPe);

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset ,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
        }
        }
      }
    }),
    {
      provide : LOCALE_ID, useValue : 'es-PE'
    }, provideFirebaseApp(() => initializeApp({ projectId: "website-vet", appId: "1:900139832225:web:828a861557b23645f4b1e0", storageBucket: "website-vet.appspot.com", apiKey: "AIzaSyD1u52pH_7DzDhzQRK4gzNVawSLooFuQlw", authDomain: "website-vet.firebaseapp.com", messagingSenderId: "900139832225" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
