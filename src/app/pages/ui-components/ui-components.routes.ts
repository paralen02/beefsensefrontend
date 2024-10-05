import { Routes } from '@angular/router';

// ui
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { UploadComponent } from './upload/upload.component';
import { OperatorsComponent } from './operators/operators.component';
import { EditOperatorsComponent } from './operators/editoperators/editoperators.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { EditInquiriesComponent } from './inquiries/editinquiries/editinquiries.component';
import { SupportComponent } from '../authentication/support/support.component';
import { GuideComponent } from './guide/guide.component';
import { LearnComponent } from './guide/learn/learn.component';
import { UseComponent } from './guide/use/use.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'upload/:idCarnes',
        component: UploadComponent,
      },
      {
        path: 'operators',
        component: OperatorsComponent,
      },
      {
        path: 'operators/edit/:idOperarios',
        component: EditOperatorsComponent,
      },
      {
        path: 'inquiries',
        component: InquiriesComponent,
      },
      {
        path: 'inquiries/edit/:idConsultas',
        component: EditInquiriesComponent,
      },
      {
        path: 'guide',
        component: GuideComponent,
      },
      {
        path: 'guide/learn',
        component: LearnComponent,
      },
      {
        path: 'guide/use',
        component: UseComponent,
      },
      {
        path: 'authentication/support',
        component: SupportComponent,
      },
    ],
  },
];
