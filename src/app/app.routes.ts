import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component'),
    },
    {
        path: '**',
        redirectTo: '/main',
    },
];
