import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, Product, Service } from '../models/order.model';
import { sumBy } from '../utils/array-utils';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private currentOrderSubject = new BehaviorSubject<Order | null>(null);
  currentOrder$: Observable<Order | null> = this.currentOrderSubject.asObservable();

  setCurrentOrder(order: Order | null): void {
    this.currentOrderSubject.next(order);
  }

  getCurrentOrder(): Order | null {
    return this.currentOrderSubject.value;
  }

  calculateOrderTotals(products: Product[], services: Service[]): {
    totalProducts: number;
    totalServices: number;
    subtotal: number;
    iva: number;
    total: number;
  } {
    const totalProducts = sumBy(products, 'precio' as keyof Product);
    const totalServices = sumBy(services, 'precio' as keyof Service);
    const subtotal = totalProducts + totalServices;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return {
      totalProducts,
      totalServices,
      subtotal,
      iva,
      total
    };
  }

  validateOrder(order: Partial<Order>): string[] {
    const errors: string[] = [];

    if (!order.customer_id) {
      errors.push('Debe seleccionar un cliente');
    }

    if (!order.tienda) {
      errors.push('Debe seleccionar una tienda');
    }

    if (!order.division) {
      errors.push('Debe seleccionar una división');
    }

    const products = order.productos as Product[] || [];
    const services = order.servicios as Service[] || [];

    if (products.length === 0 && services.length === 0) {
      errors.push('Debe agregar al menos un producto o servicio');
    }

    return errors;
  }

  clearCurrentOrder(): void {
    this.currentOrderSubject.next(null);
  }
}
