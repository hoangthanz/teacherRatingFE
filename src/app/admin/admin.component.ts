import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BaseComponent} from "../shared/components/base/base.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {ApiService} from "../shared/services/api.service";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ResultRespond} from "../core/enums/result-respond";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent extends BaseComponent {
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
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


  isVisible = false;
  validateForm!: UntypedFormGroup;

  showModalUser(): void {
    this.validateForm = this.fb.group({
      passwordOld: [null, [Validators.required]],
      passwordNew: [null, [Validators.required]],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator]
      ],
    });
    this.isVisible = true;
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['passwordNew'].value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  handleCancel(): void {
    this.isVisible = false;
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  submit() {
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      this.message.create("error", ` Vui lòng nhập đầy đủ thông tin`);
      return;
    }

    let data = this.validateForm.value;
    this.apiService.updatePassword(data).subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.message.create("success", "Thành công");
        this.isVisible = false;
      } else {
        this.message.create("error", `${res.message}`);
      }
    });

  }
}
