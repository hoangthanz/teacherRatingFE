import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from '../../../core/models/user';
import { ResultRespond } from '../../../core/enums/result-respond';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Role } from '../../../core/models/role';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Router } from '@angular/router';
import { School } from '../../../core/models/school';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent extends BaseComponent implements OnInit {
  userList: User[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  roles: Role[] = [];
  schools: School[] = [];
  currentSchool: any;

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getSchools();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator],
      ],
      displayName: [null, [Validators.required]],
      phoneNumberPrefix: ['+84'],
      phoneNumber: [null, [Validators.required]],
    });
  }

  getAllUser() {
    this.apiService.getAllUser().subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.userList = res.data;
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].index = i + 1;
        }
      }
    });
  }

  getUserBySchool(id: string) {
    this.apiService.getUserBySchool(id).subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.userList = res.data;
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].index = i + 1;
        }
      }
    });
  }

  showCreateUser(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submit() {
    let data = this.validateForm.value;
    data.schoolId = this.currentSchool.id ?? '';

    this.apiService.postUser(data).subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.message.create('success', 'Tạo tài khoản thành công');
        this.getAllUser();
        this.isVisible = false;
      } else {
        this.message.create('error', `${res.message}`);
      }
    });
  }

  getRoles = () => {
    this.apiService.getRoles().subscribe(
      (r) => {
        if (r.result != ResultRespond.Success) this.roles = [];

        this.roles = r.data;
      },
      (error) => {}
    );
  };

  removeUser(id: string | undefined) {
    if (typeof id == 'undefined') return;

    this.apiService.removeUser(id).subscribe((r) => {
      if (r.result != ResultRespond.Success)
        this.createMessage('error', 'Lỗi không cập nhật được!');

      this.createMessage('success', 'Cập nhật thành công!');
      this.getAllUser();
    });
  }

  getSchools() {
    // call api get all school

    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;

      this.schools = r.data;
      const schoolId = localStorage.getItem('school_id');

      if (schoolId != null) {
        this.currentSchool = this.schools.find((s) => s.id == schoolId);
        if (this.currentSchool != null) {
          this.getUserBySchool(this.currentSchool.id);
        }
        return;
      }

      this.currentSchool = this.schools[0];
      if (this.currentSchool != null) {
        this.getUserBySchool(this.currentSchool.id);
      }
    });
  }
}
