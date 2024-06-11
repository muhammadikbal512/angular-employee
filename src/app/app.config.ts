import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeState } from './config/state/employee/employee.state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([EmployeeState]),
      NgxsDispatchPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot()
    ),
  ],
};
