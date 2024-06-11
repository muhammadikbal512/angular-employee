import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { EmployeeComponent } from './feature/employee/employee.component';
import { EmployeeModifyDialogComponent } from './feature/employee/component/employee-modify-dialog/employee-modify-dialog.component';
import { LoginComponent } from './feature/login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'employee/add',
        component: EmployeeModifyDialogComponent
      },
      {
        path: 'employee/update/:id',
        component: EmployeeModifyDialogComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'login' },
];
