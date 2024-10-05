import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { SupportComponent } from './support/support.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
    ],
  },
];
