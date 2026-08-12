import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OperationButtonsComponents } from './components/operation-buttons-components/operation-buttons-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OperationButtonsComponents],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GymWorkout');
}
