import {Component, OnInit} from '@angular/core';
import {ConfirmModalService} from '../../confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  message = '';
  displayMessage = '';

  constructor(private confirmModalService: ConfirmModalService) {
  }

  ngOnInit(): void {
    this.message = this.confirmModalService.getMessage();
    this.confirmModalService.currentMessageSubject$.subscribe(msg => {
      this.message = msg;
    });
    this.confirmModalService.messageObservable$.subscribe(msg => {
      this.displayMessage = msg;
    });
  }

  confirm(result: boolean): void {
    this.confirmModalService.confirm(result);
  }
}
