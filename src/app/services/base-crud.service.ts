import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {
  constructor(protected supabase: SupabaseService) {}

  async getAll<T>(
    tableName: string,
    options: QueryOptions = {}
  ): Promise<T[]> {
    let query = this.supabase.client.from(tableName).select('*');

    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? true });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }

    return (data as T[]) || [];
  }

  async getById<T>(tableName: string, id: string): Promise<T | null> {
    const { data, error } = await this.supabase.client
      .from(tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching ${tableName} by id:`, error);
      throw error;
    }

    return data as T | null;
  }

  async create<T>(tableName: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.supabase.client
      .from(tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${tableName}:`, error);
      throw error;
    }

    return result as T;
  }

  async update<T>(tableName: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.supabase.client
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }

    return result as T;
  }

  async delete(tableName: string, id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting ${tableName}:`, error);
      throw error;
    }
  }

  async count(tableName: string, filters?: Record<string, any>): Promise<number> {
    let query = this.supabase.client
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { count, error } = await query;

    if (error) {
      console.error(`Error counting ${tableName}:`, error);
      throw error;
    }

    return count || 0;
  }
}
