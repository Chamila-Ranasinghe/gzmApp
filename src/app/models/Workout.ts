
export interface Workout{
    id?:string;
    day:number;
    exercise:string;
    sets:number;
    reps:number;
}

export interface Workoutdetails{
    id?:string;
    Workout_Schedule_id:string;
    date:Date;
    weight:number;
}