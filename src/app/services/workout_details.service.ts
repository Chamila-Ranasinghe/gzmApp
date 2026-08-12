import { Injectable } from '@angular/core';
import { Workout, Workoutdetails } from '../models/Workout';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDetailsService {
  table_name = 'Workout_Shedule_Details';

  constructor(private supabase: SupabaseService) {}

  async getWorkoutsDetails() {
    return await this.supabase.client.from(this.table_name).select('*');
  }

  async getWorkoutsDetailsById(id: string) {
    return await this.supabase.client.from(this.table_name).select('*').eq('id', id);
  }

  async getWorkoutsDetailsByScheduleId(id: string) {
    return await this.supabase.client
      .from(this.table_name)
      .select('*')
      .eq('Workout_Schedule_id', id)
      .order('date', { ascending: false });
  }

  async addWorkoutDetail(workoutDetail: Workoutdetails) {
    return await this.supabase.client.from(this.table_name).insert(workoutDetail);
  }

  async updateWorkoutDetail(workoutDetail: Workoutdetails) {
    return await this.supabase.client
      .from(this.table_name)
      .update(workoutDetail)
      .eq('id', workoutDetail.id);
  }

  async deleteWorkoutDetail(id: string) {
    return await this.supabase.client.from(this.table_name).delete().eq('id', id);
  }
}
