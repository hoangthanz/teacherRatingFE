import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {User} from "../../../core/models/user";
import {ResultRespond} from "../../../core/enums/result-respond";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

    userList: User [] = [];
    isVisible = false;
    validateForm!: UntypedFormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };

    constructor(
        public apiService: ApiService,
        public message: NzMessageService,
        private fb: UntypedFormBuilder
    ) {
        this.getAllUser();
    }

    getAllUser() {
        this.apiService.getAllUser().subscribe(res => {
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
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
    }

    confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.validateForm.controls["password"].value) {
            return {confirm: true, error: true};
        }
        return {};
    };


    ngOnInit(): void {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            displayName: [null, [Validators.required]],
            phoneNumberPrefix: ['+84'],
            phoneNumber: [null, [Validators.required]],
        });
    }

    submit() {
        this.apiService.postUser(this.validateForm.value).subscribe(res => {
            if (res.result == ResultRespond.Success) {
                this.message.create('success', 'Tạo tài khoản thành công');
                this.getAllUser();
                this.isVisible = false;
            } else {
                this.message.create('error', 'Tạo tài khoản thất bại');
            }
        });
    }
}

