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

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"]
})
export class TeacherComponent extends BaseComponent implements OnInit {
  teachers: Teacher[] = [];
  teachers1: Teacher[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;
  keySearch = "";
  schools: School[] = [];
  currentSchool: any;
  userList: User[] = [];

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getTeacher();
  }

  search() {
    // this.getTeacher();
    this.teachers = this.teachers1.filter((x) => x.name?.includes(this.keySearch));
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [""],
      phoneNumber: [""],
      email: [""],
      name: [""],
      description: [""],
      address: [""],
      userId: [""]
    });
    this.getSchools();
  }

  getSchools() {
    // call api get all school
    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.schools = r.data;
      const schoolId = localStorage.getItem("school_id");

      this.currentSchool = this.schools[0];
      if (this.currentSchool != null) {
        this.getUserBySchool(this.currentSchool.id);
      }
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
    this.apiService.getTeacher().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teachers = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }
      this.teachers = r.data;
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
      this.teachers = [];
      for (let i = 0; i < 100; i++) {
        this.teachers.push({
          id: i.toString(),
          name: "Giáo viên " + i.toString(),
          description: "Mô tả " + i.toString(),
          phoneNumber: "090606335" + i.toString(),
          email: "Email" + i.toString() + "@gmail.com",
          userId: "User Id " + i.toString()
        });
      }
      this.teachers1 = JSON.parse(JSON.stringify(this.teachers));
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
    const valueOfForm = this.validateForm.value;
    valueOfForm.schoolId = this.currentSchool.id;
    this.apiService.postTeacher(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {

        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo thành công");
      this.getTeacher();
    }, () => {
      this.isVisible = false;
      this.teachers.push(valueOfForm);
    });
  }

  putTeachers() {
    const valueOfForm = this.validateForm.value;
    valueOfForm.schoolId = this.currentSchool.id;
    // call api create teacher-group
    this.apiService.putTeachers(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật thành công");
      this.getTeacher();
    }, () => {
      this.isVisible = false;
      this.teachers = this.teachers.map(x => {
        if (x.id == valueOfForm.id) {
          x.name = valueOfForm.name;
        }
        return x;
      });
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
