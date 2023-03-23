import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  constructor(public router: Router, public message: NzMessageService) {
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
}
