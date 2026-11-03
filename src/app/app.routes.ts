import { Routes } from '@angular/router';
import { CanActivateService, canActivateSignIn } from './shared/services/can-activate.service';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./public/public-routing')
    },
    {
        path: 'auth',
        canActivate: [canActivateSignIn],
        loadChildren: () => import('./auth/auth-routing').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'profile',
        canActivate : [CanActivateService],
        loadChildren: () => import('./profile/profile-routing')
    }
];