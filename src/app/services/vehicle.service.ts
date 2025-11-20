import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Vehicle } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private supabase: SupabaseService) {}

  async getVehiclesByCustomer(customerId: string): Promise<Vehicle[]> {
    const { data, error } = await this.supabase.client
      .from('vehicles')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }

    return data || [];
  }

  async getVehicleById(vehicleId: string): Promise<Vehicle | null> {
    const { data, error } = await this.supabase.client
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .maybeSingle();

    if (error) {
      console.error('Error al obtener vehículo:', error);
      throw error;
    }

    return data;
  }

  async createVehicle(vehicle: Partial<Vehicle>): Promise<Vehicle> {
    const { data, error } = await this.supabase.client
      .from('vehicles')
      .insert([vehicle])
      .select()
      .single();

    if (error) {
      console.error('Error al crear vehículo:', error);
      throw error;
    }

    return data;
  }

  async updateVehicle(vehicleId: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const { data, error } = await this.supabase.client
      .from('vehicles')
      .update(updates)
      .eq('id', vehicleId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar vehículo:', error);
      throw error;
    }

    return data;
  }

  async deleteVehicle(vehicleId: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('vehicles')
      .delete()
      .eq('id', vehicleId);

    if (error) {
      console.error('Error al eliminar vehículo:', error);
      throw error;
    }
  }

  validateVehicleData(vehicle: Partial<Vehicle>): string[] {
    const errors: string[] = [];

    if (!vehicle.placas || vehicle.placas.trim() === '') {
      errors.push('Las placas son requeridas');
    }

    if (!vehicle.marca || vehicle.marca.trim() === '') {
      errors.push('La marca es requerida');
    }

    if (!vehicle.modelo || vehicle.modelo.trim() === '') {
      errors.push('El modelo es requerido');
    }

    if (!vehicle.anio || vehicle.anio.trim() === '') {
      errors.push('El año es requerido');
    }

    return errors;
  }
}
