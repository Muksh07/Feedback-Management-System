import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { myRouting } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myInterceptor } from './Security/my.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(myRouting),provideHttpClient(withInterceptors([myInterceptor])), provideAnimationsAsync('noop'), provideAnimationsAsync()]
};
