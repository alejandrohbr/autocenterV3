import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, ProductosPorProveedor } from '../models/order.model';
import { AuthService } from '../services/auth.service';
import { OrderPermissionsService } from '../services/order-permissions.service';
import { formatCurrencyValue } from '../utils/number-utils';

@Component({
  selector: 'app-pre-oc-validation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6" *ngIf="order">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Validación Pre-OC</h2>
          <p class="text-sm text-gray-600 mt-1">
            Doble chequeo antes de generar la Orden de Compra
          </p>
        </div>
        <button
          (click)="onClose.emit()"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Información de la Orden -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p class="text-sm font-medium text-blue-900">Folio de Orden</p>
            <p class="text-lg font-bold text-blue-700">{{ order.folio }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-900">Cliente</p>
            <p class="text-lg font-bold text-blue-700">{{ order.cliente }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-900">Vehículo</p>
            <p class="text-lg font-bold text-blue-700 capitalize">{{ getVehicleInfo() }}</p>
            <p class="text-xs text-blue-600 capitalize">{{ getVehicleDetails() }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-900">Fecha</p>
            <p class="text-lg font-bold text-blue-700">{{ formatDate(order.fecha) }}</p>
            <p class="text-xs text-blue-600">{{ formatTime(order.fecha) }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-900">Productos Procesados</p>
            <p class="text-lg font-bold text-purple-700">{{ getTotalProducts() }} productos</p>
          </div>
        </div>

        <!-- Resumen Financiero -->
        <div class="border-t border-blue-200 pt-4 mt-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-3">
              <p class="text-sm font-medium text-gray-700">Subtotal</p>
              <p class="text-xl font-bold text-gray-900">\${{ formatCurrency(getSubtotal()) }}</p>
            </div>
            <div class="bg-white rounded-lg p-3">
              <p class="text-sm font-medium text-gray-700">IVA (16%)</p>
              <p class="text-xl font-bold text-orange-600">\${{ formatCurrency(getIVA()) }}</p>
            </div>
            <div class="bg-white rounded-lg p-3">
              <p class="text-sm font-medium text-gray-700">Total con IVA</p>
              <p class="text-2xl font-bold text-green-700">\${{ formatCurrency(getTotal()) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen de Refacciones por Proveedor -->
      <div class="mb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-3">
          Refacciones a Ordenar ({{ order.productosPorProveedor?.length || 0 }} proveedores)
        </h3>
        <div class="space-y-3 max-h-[500px] overflow-y-auto pr-2" *ngIf="order.productosPorProveedor && order.productosPorProveedor.length > 0">
          <div
            *ngFor="let proveedor of order.productosPorProveedor; let i = index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <!-- Header del proveedor - Siempre visible -->
            <button
              (click)="toggleProvider(i)"
              class="w-full bg-gray-50 hover:bg-gray-100 transition-colors p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-gray-600 transition-transform"
                  [class.rotate-90]="expandedProviders.has(i)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <div class="text-left">
                  <h4 class="font-bold text-gray-900">{{ proveedor.proveedor }}</h4>
                  <p class="text-xs text-gray-600" *ngIf="proveedor.rfc">
                    RFC: {{ proveedor.rfc }}
                  </p>
                </div>
              </div>
              <div class="text-right flex items-center gap-4">
                <div>
                  <p class="text-xs text-gray-600">{{ proveedor.productos.length }} productos</p>
                  <p class="text-lg font-bold text-blue-600">
                    \${{ formatCurrency(proveedor.montoTotal) }}
                  </p>
                </div>
              </div>
            </button>

            <!-- Contenido expandible - Solo visible cuando está abierto -->
            <div *ngIf="expandedProviders.has(i)" class="bg-white border-t border-gray-200">
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead class="bg-gray-200">
                    <tr>
                      <th class="text-left p-2 font-bold">Descripción</th>
                      <th class="text-center p-2 font-bold">SKU Oracle</th>
                      <th class="text-right p-2 font-bold">Costo Unit.</th>
                      <th class="text-center p-2 font-bold">Cant.</th>
                      <th class="text-right p-2 font-bold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let producto of proveedor.productos" class="border-b border-gray-100 hover:bg-gray-50">
                      <td class="p-2 font-medium">
                        <div class="max-w-xs truncate" [title]="producto.descripcion">
                          {{ producto.descripcion }}
                        </div>
                        <div class="text-xs text-gray-500">
                          Div: {{ producto.division || '-' }} | Línea: {{ producto.linea || '-' }} | Clase: {{ producto.clase || '-' }}
                        </div>
                      </td>
                      <td class="text-center p-2 font-mono text-xs bg-yellow-50 font-semibold">
                        {{ producto.sku_oracle || 'N/A' }}
                      </td>
                      <td class="text-right p-2">\${{ formatCurrency(producto.precio || 0) }}</td>
                      <td class="text-center p-2 font-semibold">{{ producto.cantidad }}</td>
                      <td class="text-right p-2 font-bold text-green-700">
                        \${{ formatCurrency((producto.precio || 0) * producto.cantidad) }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-gray-100">
                    <tr>
                      <td colspan="4" class="p-2 text-right font-bold">Subtotal Proveedor:</td>
                      <td class="p-2 text-right font-bold text-blue-700">
                        \${{ formatCurrency(proveedor.montoTotal) }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          *ngIf="!order.productosPorProveedor || order.productosPorProveedor.length === 0"
          class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg"
        >
          <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p>No hay refacciones cargadas</p>
        </div>
      </div>

      <!-- Notas de Validación -->
      <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700 mb-2">
          Notas de Validación (Opcional)
        </label>
        <textarea
          [(ngModel)]="validationNotes"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Agregue cualquier observación sobre esta orden antes de generar la OC..."
          [disabled]="processing"
        ></textarea>
      </div>

      <!-- Estado de Validación Actual -->
      <div
        *ngIf="order.pre_oc_validation_status && order.pre_oc_validation_status !== 'pending'"
        class="mb-6 p-4 rounded-lg"
        [ngClass]="{
          'bg-green-50 border-l-4 border-green-500': order.pre_oc_validation_status === 'approved',
          'bg-red-50 border-l-4 border-red-500': order.pre_oc_validation_status === 'rejected'
        }"
      >
        <div class="flex items-center gap-2 mb-2">
          <svg
            *ngIf="order.pre_oc_validation_status === 'approved'"
            class="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg
            *ngIf="order.pre_oc_validation_status === 'rejected'"
            class="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <p class="font-bold" [ngClass]="{
            'text-green-900': order.pre_oc_validation_status === 'approved',
            'text-red-900': order.pre_oc_validation_status === 'rejected'
          }">
            {{ order.pre_oc_validation_status === 'approved' ? 'Validación Aprobada' : 'Validación Rechazada' }}
          </p>
        </div>
        <p class="text-sm text-gray-700" *ngIf="order.pre_oc_validation_notes">
          {{ order.pre_oc_validation_notes }}
        </p>
        <p class="text-xs text-gray-600 mt-2" *ngIf="order.pre_oc_validated_at">
          {{ order.pre_oc_validated_at | date:'medium' }}
        </p>
      </div>

      <!-- Acciones -->
      <div *ngIf="canValidate()">
        <!-- Si está pendiente de validación, mostrar botones aprobar/rechazar -->
        <div class="flex gap-4" *ngIf="!order.pre_oc_validation_status || order.pre_oc_validation_status === 'pending'">
          <button
            (click)="approve()"
            [disabled]="processing"
            class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{{ processing ? 'Aprobando...' : 'Aprobar y Continuar' }}</span>
          </button>

          <button
            (click)="reject()"
            [disabled]="processing"
            class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span>{{ processing ? 'Rechazando...' : 'Rechazar' }}</span>
          </button>
        </div>

        <!-- Si ya está aprobado y no tiene OC, mostrar botón generar OC -->
        <div *ngIf="order.pre_oc_validation_status === 'approved' && !order.purchase_order_number">
          <button
            (click)="generatePurchaseOrder()"
            [disabled]="processing"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>{{ processing ? 'Generando Orden de Compra...' : 'Generar Orden de Compra' }}</span>
          </button>
        </div>

        <!-- Si ya tiene OC generada, mostrar número -->
        <div *ngIf="order.purchase_order_number" class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-green-900 text-lg">Orden de Compra Generada</p>
              <p class="text-sm text-green-700 mt-1">Esta orden ya tiene una OC asignada</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-green-700 font-medium">Número de OC</p>
              <p class="text-2xl font-bold text-green-900">{{ order.purchase_order_number }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no tiene permisos -->
      <div
        *ngIf="!canValidate()"
        class="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-yellow-900"
      >
        <p class="font-medium">No tienes permisos para validar esta orden</p>
        <p class="text-sm mt-1">
          Solo Gerentes, Admin Corporativo y Super Admin pueden aprobar la validación pre-OC
        </p>
      </div>
    </div>
  `
})
export class PreOcValidationComponent {
  formatCurrency = formatCurrencyValue;

  @Input() order!: Order;
  @Output() onApprove = new EventEmitter<{ notes: string }>();
  @Output() onReject = new EventEmitter<{ notes: string }>();
  @Output() onGeneratePO = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  validationNotes: string = '';
  processing: boolean = false;
  expandedProviders: Set<number> = new Set();

  constructor(
    private authService: AuthService,
    private permissionsService: OrderPermissionsService
  ) {}

  toggleProvider(index: number): void {
    if (this.expandedProviders.has(index)) {
      this.expandedProviders.delete(index);
    } else {
      this.expandedProviders.add(index);
    }
  }

  getVehicleInfo(): string {
    const vehicle = this.order.vehicle || this.order.vehiculo;
    return vehicle?.placas || 'N/A';
  }

  getVehicleDetails(): string {
    const vehicle = this.order.vehicle || this.order.vehiculo;
    if (!vehicle) return '';
    return `${vehicle.marca || ''} ${vehicle.modelo || ''}`.trim();
  }

  formatDate(fecha: any): string {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatTime(fecha: any): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }

  getTotalProducts(): number {
    if (!this.order.productosPorProveedor) return 0;
    return this.order.productosPorProveedor.reduce(
      (total, proveedor) => total + proveedor.productos.length,
      0
    );
  }

  getSubtotal(): number {
    if (!this.order.productosPorProveedor) return 0;
    return this.order.productosPorProveedor.reduce(
      (total, proveedor) => total + proveedor.montoTotal,
      0
    );
  }

  getIVA(): number {
    return this.getSubtotal() * 0.16;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getIVA();
  }

  canValidate(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const allowedRoles = ['super_admin', 'admin_corporativo', 'gerente'];
    return allowedRoles.includes(user.role);
  }

  approve(): void {
    if (!this.canValidate() || this.processing) return;

    if (confirm('¿Está seguro de aprobar esta orden para generar la OC?')) {
      this.processing = true;
      this.onApprove.emit({ notes: this.validationNotes });
    }
  }

  reject(): void {
    if (!this.canValidate() || this.processing) return;

    if (!this.validationNotes.trim()) {
      alert('Por favor agregue una nota explicando el motivo del rechazo');
      return;
    }

    if (confirm('¿Está seguro de rechazar esta orden?')) {
      this.processing = true;
      this.onReject.emit({ notes: this.validationNotes });
    }
  }

  generatePurchaseOrder(): void {
    if (!this.canValidate() || this.processing) return;

    if (this.order.pre_oc_validation_status !== 'approved') {
      alert('La orden debe estar aprobada antes de generar la OC');
      return;
    }

    if (confirm('¿Está seguro de generar la Orden de Compra?\n\nEsta acción creará un número de OC único y cambiará el estado de la orden.')) {
      this.processing = true;
      this.onGeneratePO.emit();
    }
  }
}
