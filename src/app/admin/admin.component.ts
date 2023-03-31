import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BaseComponent} from "../shared/components/base/base.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {ApiService} from "../shared/services/api.service";
import {UntypedFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent extends BaseComponent {
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    public override router: Router
  ) {
    super(router, message);
  }

  role = this.getRole();
  goToSelfAssessment() {
    this.router.navigate(['admin/self-assessment']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  getRole() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_email');
    localStorage.removeItem('current_user_id');
    localStorage.removeItem('teacher_id');
    this.router.navigate(['login']);
  }

  goToSelfAssessmentList() {
    this.router.navigate(['admin/self-assessment-list']);
  }

  goToUserPage() {
    this.router.navigate(['admin/user']);
  }

  goToSchoolPage() {
    this.router.navigate(['admin/school']);
  }

  goToTeacherGroupPage() {
    this.router.navigate(['admin/teacher-group']);
  }

  goToCriteriaGroupPage() {
    this.router.navigate(['admin/criteria-group']);
  }

  goToCriteriaPage() {
    this.router.navigate(['admin/criteria']);
  }
  goToTeacherPage() {
    this.router.navigate(['admin/teacher']);
  }


  goShowALlPage() {
    this.router.navigate(['admin/show-all']);
  }
  goGradePage() {
    this.router.navigate(['admin/grade']);
  }
  goFilePage() {
    this.router.navigate(['admin/files']);
  }
}
