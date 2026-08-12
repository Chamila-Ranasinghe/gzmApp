import { Injectable } from '@angular/core';
import { Workout } from '../models/Workout';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  table_name = 'Workout_Shedule';

  constructor(private supabase: SupabaseService) {}

  async getWorkouts() {
    return await this.supabase.client.from(this.table_name).select('*');
  }

  async getWorkoutsbyId(id: string) {
    return await this.supabase.client.from(this.table_name).select('*').eq('id', id);
  }

  async addWorkout(workout: Workout) {
    return await this.supabase.client.from(this.table_name).insert(workout);
  }

  async updateWorkout(workout: Workout) {
    return await this.supabase.client.from(this.table_name).update(workout).eq('id', workout.id);
  }

  async deleteWorkout(id: string) {
    return await this.supabase.client.from(this.table_name).delete().eq('id', id);
  }
}
