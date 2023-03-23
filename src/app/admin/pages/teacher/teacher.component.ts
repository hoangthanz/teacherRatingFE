import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import { Teacher } from "../../../core/models/teacher";
import { School } from "../../../core/models/school";
import { User } from "../../../core/models/user";
import {RequsetCreateTeacherModel} from "../../../core/models/request/requset-create-teacher.model";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"]
})
export class TeacherComponent extends BaseComponent implements OnInit {
  teachers: Teacher[] = [];
  allTeachers: Teacher[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;
  keySearch = "";
  schools: School[] = [];
  userList: User[] = [];
  currentSchoolId = localStorage.getItem('school_id');

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.currentSchoolId = localStorage.getItem('school_id');
  }

  search() {
    this.teachers = this.allTeachers;
    if(this.keySearch !== ""){
      this.teachers = this.teachers.filter((x) => x.name?.includes(this.keySearch));
    }

  }

  ngOnInit(): void {
    this.getTeacher();
    this.getUserBySchool(this.currentSchoolId ?? '');

    this.validateForm = this.fb.group({
      id: [""],
      phoneNumber: [""],
      email: [""],
      name: [""],
      description: [""],
      address: [""],
      userId: [""]
    });

  }

  getUserBySchool(id: string) {
    this.apiService.getUserBySchool(id).subscribe((res) => {
      if (res.result == ResultRespond.Success) {
        this.userList = res.data.filter((x) => x.isDeleted != true);
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].index = i + 1;
        }
      }
    });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModelTeacher(id = ""): void {
    if (id != "") {
      this.isCreate = false;
      const data = this.teachers.find((x) => x.id == id);
      this.validateForm = this.fb.group({
        id: [data?.id],
        name: [data?.name, [Validators.required]],
        description: [data?.description],
        phoneNumber: [data?.phoneNumber],
        email: [data?.email],
        userId: [data?.userId ?? this.userList[0].id]
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
        description: [""],
        phoneNumber: [""],
        email: [""],
        userId: [this.userList[0].id]
      });
    }
    this.isVisible = true;
  }

  getTeacher() {
    this.apiService.getTeacher(this.currentSchoolId ?? '').subscribe((r:Teacher[]) => {
      if (r.length === 0) {
        this.teachers = [];
        this.allTeachers = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
        return;
      }
      this.allTeachers = r;
      this.teachers = r;
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
      this.teachers = [];
      this.allTeachers = [];
    });
  }

  removeTeacher(id: string | undefined) {
    if (typeof id == "undefined") return;

    this.apiService.removeTeacher(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teachers = [];
        this.getTeacher();
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.createMessage("success", "Xóa thành công");
      this.getTeacher();
    }, () => {
      this.teachers = this.teachers.filter(x => x.id != id);
    });
  }

  postTeachers() {

    const request: RequsetCreateTeacherModel = {
      name: this.validateForm.controls['name'].value,
      phoneNumber: this.validateForm.controls['phoneNumber'].value,
      email: this.validateForm.controls['email'].value,
      userId: this.validateForm.controls['userId'].value,
      schoolId: this.currentSchoolId ?? '',
      groupId: ''
    }


    this.apiService.postTeacher(request).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo thành công");
      this.getTeacher();
    }, () => {
      this.isVisible = false;
    });
  }

  putTeachers() {
    const request: RequsetCreateTeacherModel = {
      id: this.validateForm.controls['id'].value,
      name: this.validateForm.controls['name'].value,
      phoneNumber: this.validateForm.controls['phoneNumber'].value,
      email: this.validateForm.controls['email'].value,
      userId: this.validateForm.controls['userId'].value,
      schoolId: this.currentSchoolId ?? '',
      groupId: ''
    }

    // call api create teacher-group
    this.apiService.putTeachers(request).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật thành công");
      this.getTeacher();
    }, () => {
      this.isVisible = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
