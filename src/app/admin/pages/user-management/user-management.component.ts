import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {User} from "../../../core/models/user";
import {ResultRespond} from "../../../core/enums/result-respond";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {Role} from "../../../core/models/role";
import {BaseComponent} from "../../../shared/components/base/base.component";
import {Router} from "@angular/router";
import {School} from "../../../core/models/school";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"]
})
export class UserManagementComponent extends BaseComponent implements OnInit {
  userList: User[] = [];
  userListOld: User[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: "info-circle",
    theme: "twotone"
  };
  roles: Role[] = [];
  schools: School[] = [];
  currentSchool: any;
  keySearch = "";
  isCreate = true;

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getSchools();
  }

  search() {
    this.userList = this.userListOld.filter((x) => x.userName?.toLowerCase()?.includes(this.keySearch?.toLowerCase())
      || x.displayName?.toLowerCase()?.includes(this.keySearch?.toLowerCase()));
  }

  ngOnInit(): void {
    this.showModalUser();
    this.isVisible = false;
  }

  getAllUser() {
    this.apiService.getAllUser().subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.userList = res.data.filter((x) => x.isDeleted != true && x.userName != "admin");
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].index = i + 1;
        }
        this.userListOld = JSON.parse(JSON.stringify(this.userList));
      }
    });
  }

  getUserBySchool(id: string) {
    this.apiService.getUserBySchool(id).subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.userList = res.data.filter((x) => x.isDeleted != true && x.userName != "admin");
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].index = i + 1;
        }
        this.userListOld = JSON.parse(JSON.stringify(this.userList));
      }
    });
  }

  showCreateUser(): void {
    this.isVisible = true;
    this.isCreate = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
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
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return;
    }

    if (this.isCreate) {
      let data = this.validateForm.value;
      this.apiService.postUser(data).subscribe((res) => {
        if (res.result == ResultRespond.Success) {
          this.message.create("success", "Tạo tài khoản thành công");
          this.getAllUser();
          this.isVisible = false;
        } else {
          this.message.create("error", `${res.message}`);
        }
      });
    } else {
      let data = this.validateForm.value;
      this.apiService.putUser(data).subscribe((res) => {
        if (res.result == ResultRespond.Success) {
          this.message.create("success", "Cập nhật tài khoản thành công");
          this.getAllUser();
          this.isVisible = false;
        } else {
          this.message.create("error", `${res.message}`);
        }
      });
    }
  }

  getRoles = () => {
    this.apiService.getRoles().subscribe(
      (r) => {
        if (r.result != ResultRespond.Success) this.roles = [];

        this.roles = r.data;
      },
      () => {
      }
    );
  };

  showModalUser(id = ""): void {
    const user = this.userList.find((x) => x.id == id);
    if (id != "" && user) {
      this.isCreate = false;
      this.validateForm = this.fb.group({
        userName: [user?.userName, [Validators.required]],
        email: [user?.email, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        confirmPassword: [
          null,
          [Validators.required, this.confirmationValidator]
        ],
        displayName: [user?.displayName, [Validators.required]],
        phoneNumberPrefix: ["+84"],
        phoneNumber: [user?.phoneNumber, [Validators.required]],
        schoolId: [user?.schoolId],
        id: [id]
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        userName: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        confirmPassword: [
          null,
          [Validators.required, this.confirmationValidator]
        ],
        displayName: [null, [Validators.required]],
        phoneNumberPrefix: ["+84"],
        phoneNumber: [null, [Validators.required]],
        schoolId: [this.currentSchool?.id],
        id: [null]
      });
    }
    this.isVisible = true;
  }

  removeUser(id: string | undefined) {
    if (typeof id == "undefined") return;
    this.apiService.removeUser(id).subscribe((r) => {
      if (r.result != ResultRespond.Success)
        this.createMessage("error", "Lỗi không cập nhật được!");
      this.createMessage("success", "Cập nhật thành công!");
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
        this.currentSchool = this.schools.find((s) => s.id == schoolId) ?? this.schools[0];
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
