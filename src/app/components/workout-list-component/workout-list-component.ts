import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutDetailsService } from '../../services/workout_details.service';
import { Workoutdetails } from '../../models/Workout';

@Component({
  selector: 'app-workout-list-component',
  imports: [ReactiveFormsModule],
  templateUrl: './workout-list-component.html',
  styleUrl: './workout-list-component.scss',
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  hoursLeft = signal(0);
  minutesLeft = signal(0);
  secondsLeft = signal(0);
  workouts = signal<any[]>([]);
  workoutDetails = signal<any[]>([]);
  progressForm!: FormGroup;
  selectedWorkoutId = '';

  @ViewChild('my_modal_6')
  modal!: ElementRef<HTMLDialogElement>;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private workoutDetailsService: WorkoutDetailsService
  ) {}

  private timer?: ReturnType<typeof setInterval>;

  async ngOnInit() {

    this.progressForm = this.fb.group({
      date: [this.getTodayDate()],
      weight: [0, Validators.required],
    });

    // Timer starts when the user sets a time.
    this.setTime(1, 15); // Example: Set timer for 1 minute and 15 seconds
    const { data, error } = await this.workoutService.getWorkouts();
    if (error) {
      console.error(error);
    } else {
      this.workouts.set(data);
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  setTime(minutes: number, seconds: number) {
    const totalSeconds = minutes * 60 + seconds;
    this.updateTimeSignals(totalSeconds);
    this.startTimer();
  }

  private startTimer() {
    this.clearTimer();

    this.timer = setInterval(() => {
      const totalSeconds = this.hoursLeft() * 3600 + this.minutesLeft() * 60 + this.secondsLeft();
      if (totalSeconds <= 0) {
        this.clearTimer();
        return;
      }

      this.updateTimeSignals(totalSeconds - 1);
    }, 1000);
  }

  private updateTimeSignals(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.hoursLeft.set(hours);
    this.minutesLeft.set(minutes);
    this.secondsLeft.set(seconds);
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  onclickSaveProgress(workoutId: string) {
    this.selectedWorkoutId = workoutId;
    this.modal.nativeElement.showModal();
  }

  async onSaveProgress() {
    let requestData : Workoutdetails = {
      Workout_Schedule_id: this.selectedWorkoutId,
      date: this.progressForm.value.date,
      weight: this.progressForm.value.weight,
    };

    const { data, error } = await this.workoutDetailsService.addWorkoutDetail(requestData);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  async onClickShowProgressRecords(workoutId: string) {
    this.workoutDetails.set([]); // Clear previous workout details
    const { data, error } = await this.workoutDetailsService.getWorkoutsDetailsByScheduleId(workoutId);
    if (error) {
      console.error(error);
    } else {
      console.log('Workout Details:', data);
      this.workoutDetails.set(data);
    }
  }
}
