import { supabase } from './supabase';
import { Task, CreateTaskData, UpdateTaskData } from '../types/task';

export const taskService = {
  // Get all tasks for the current user
  async getTasks(): Promise<{ data: Task[] | null; error: any }> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Create a new task
  async createTask(taskData: CreateTaskData): Promise<{ data: Task | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          ...taskData,
          user_id: user.id,
        }
      ])
      .select()
      .single();

    return { data, error };
  },

  // Update a task
  async updateTask(id: string, updates: UpdateTaskData): Promise<{ data: Task | null; error: any }> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete a task
  async deleteTask(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    return { error };
  }
};