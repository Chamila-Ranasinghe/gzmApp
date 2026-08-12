import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OperationButtonsComponents } from './components/operation-buttons-components/operation-buttons-components';
import { WorkoutListComponent } from './components/workout-list-component/workout-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WorkoutListComponent, OperationButtonsComponents],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GymWorkout');
}
