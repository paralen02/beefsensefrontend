import { Routes } from '@angular/router';

// ui
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { UploadComponent } from './upload/upload.component';
import { OperatorsComponent } from './operators/operators.component';
import { EditOperatorsComponent } from './operators/editoperators/editoperators.component';

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
    ],
  },
];
