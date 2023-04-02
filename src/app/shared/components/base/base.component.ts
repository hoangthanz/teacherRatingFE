import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {JwtHelperService} from "@auth0/angular-jwt";

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

  getUserId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }
    return '';
  }

  getTeacherId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['TeacherId'];
    }
    return '';
  }

  getGroupId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['GroupId'];
    }
    return '';
  }

  checkAdmin() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return roles.includes('Admin');
    }
    return false;
  }
}
