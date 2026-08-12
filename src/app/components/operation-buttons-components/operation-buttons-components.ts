import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-operation-buttons-components',
  imports: [ReactiveFormsModule],
  templateUrl: './operation-buttons-components.html',
  styleUrl: './operation-buttons-components.scss',
})
export class OperationButtonsComponents {
  workoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      exercise: ['', Validators.required],
      day: [1, Validators.required],
      sets: [1, Validators.required],
      reps: [1, Validators.required],
    });
  }

  ngOnDestroy() {}

  onEdit() {
    // Logic to handle edit action
  }

  onDelete() {
    console.log('Delete action triggered');
    // Logic to handle delete action
  }

  async onAddWorkout() {
    const { data, error } = await this.workoutService.addWorkout(this.workoutForm.value);
    if (error) {
      console.error(error);
    }
    this.workoutForm.reset();
    
    return data;
  }
}
