import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { myRouting } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myInterceptor } from './Security/my.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(myRouting),provideHttpClient(withInterceptors([myInterceptor]))]
};
