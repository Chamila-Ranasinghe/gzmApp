import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { WorkoutService } from './services/workout.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule)
  ], 
  
  
};
