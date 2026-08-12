import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/workout-list-component/workout-list-component').then(m => m.WorkoutListComponent)
  }
];
