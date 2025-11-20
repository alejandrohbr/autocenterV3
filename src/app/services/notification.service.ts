import { Injectable } from '@angular/core';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private timeouts: Map<number, any> = new Map();

  getNotifications(): Notification[] {
    return this.notifications;
  }

  success(message: string, duration: number = 3000): void {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration: number = 5000): void {
    this.show({ type: 'error', message, duration });
  }

  warning(message: string, duration: number = 4000): void {
    this.show({ type: 'warning', message, duration });
  }

  info(message: string, duration: number = 3000): void {
    this.show({ type: 'info', message, duration });
  }

  private show(notification: Notification): void {
    const index = this.notifications.length;
    this.notifications.push(notification);

    if (notification.duration && notification.duration > 0) {
      const timeout = setTimeout(() => {
        this.remove(index);
        this.timeouts.delete(index);
      }, notification.duration);
      this.timeouts.set(index, timeout);
    }
  }

  remove(index: number): void {
    if (index >= 0 && index < this.notifications.length) {
      this.notifications.splice(index, 1);
      const timeout = this.timeouts.get(index);
      if (timeout) {
        clearTimeout(timeout);
        this.timeouts.delete(index);
      }
    }
  }

  clear(): void {
    this.notifications = [];
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }
}
