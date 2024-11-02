import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  private confirmSubject = new Subject<boolean>();
  private messageSubject = new Subject<string>();
  currentMessageSubject$ = new Subject<string>();
  private confirmMessage = '';

  confirmObservable$: Observable<boolean> = this.confirmSubject.asObservable();
  messageObservable$: Observable<string> = this.messageSubject.asObservable();

  constructor() {
  }

  openConfirmModal(message: string): void {
    this.currentMessageSubject$.next(message);
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  confirm(result: boolean): void {
    this.confirmSubject.next(result);
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  showMessage(message: string): void {
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(''), 3000); // Ocultar mensaje después de 3 segundos
  }

  getMessage(): string {
    return this.confirmMessage;
  }
}
