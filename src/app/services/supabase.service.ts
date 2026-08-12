import { Injectable } from "@angular/core";
import { createClient } from '@supabase/supabase-js';
import { environment } from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
  );

}