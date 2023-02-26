import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {

    constructor(private router: Router) {
    }

    goToSelfAssessment() {
        this.router.navigate(['admin/self-assessment']);
    }

    goToLogin() {
        this.router.navigate(['login']);
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
}
