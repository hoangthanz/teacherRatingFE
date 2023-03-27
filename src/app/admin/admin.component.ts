import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TeacherComponent } from "./pages/teacher/teacher.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private router: Router) {

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
