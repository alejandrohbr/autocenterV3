import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ViewType = 'dashboard' | 'new-order' | 'customer-search' | 'authorization' | 'invoice-upload' | 'lost-sales-report' | 'admin-validation' | 'pre-oc-validation' | 'not-found-products';
export type TabType = 'info' | 'products' | 'services' | 'summary' | 'diagnostic' | 'xml-products' | 'billing';

export interface ModalState {
  orderDetail: boolean;
  services: boolean;
  authorization: boolean;
  invoiceUpload: boolean;
  xmlUpload: boolean;
  productClassification: boolean;
  budgetPreview: boolean;
  diagnostic: boolean;
  preOCValidation: boolean;
  payment: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  private activeViewSubject = new BehaviorSubject<ViewType>('dashboard');
  activeView$: Observable<ViewType> = this.activeViewSubject.asObservable();

  private activeTabSubject = new BehaviorSubject<TabType>('info');
  activeTab$: Observable<TabType> = this.activeTabSubject.asObservable();

  private modalsSubject = new BehaviorSubject<ModalState>({
    orderDetail: false,
    services: false,
    authorization: false,
    invoiceUpload: false,
    xmlUpload: false,
    productClassification: false,
    budgetPreview: false,
    diagnostic: false,
    preOCValidation: false,
    payment: false
  });
  modals$: Observable<ModalState> = this.modalsSubject.asObservable();

  setActiveView(view: ViewType): void {
    this.activeViewSubject.next(view);
  }

  getActiveView(): ViewType {
    return this.activeViewSubject.value;
  }

  setActiveTab(tab: TabType): void {
    this.activeTabSubject.next(tab);
  }

  getActiveTab(): TabType {
    return this.activeTabSubject.value;
  }

  openModal(modalName: keyof ModalState): void {
    const currentState = this.modalsSubject.value;
    this.modalsSubject.next({
      ...currentState,
      [modalName]: true
    });
  }

  closeModal(modalName: keyof ModalState): void {
    const currentState = this.modalsSubject.value;
    this.modalsSubject.next({
      ...currentState,
      [modalName]: false
    });
  }

  closeAllModals(): void {
    this.modalsSubject.next({
      orderDetail: false,
      services: false,
      authorization: false,
      invoiceUpload: false,
      xmlUpload: false,
      productClassification: false,
      budgetPreview: false,
      diagnostic: false,
      preOCValidation: false,
      payment: false
    });
  }

  isModalOpen(modalName: keyof ModalState): boolean {
    return this.modalsSubject.value[modalName];
  }
}
