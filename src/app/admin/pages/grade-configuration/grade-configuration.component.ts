import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import {GradeConfiguration} from "../../../core/models/criteria";
import { School } from "../../../core/models/school";

@Component({
  selector: "app-criteria",
  templateUrl: "./grade-configuration.component.html",
  styleUrls: ["./grade-configuration.component.css"]
})
export class GradeConfigurationComponent extends BaseComponent implements OnInit {
  grade: GradeConfiguration[] = [];
  gradeOld: GradeConfiguration[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;
  keySearch = "";

  schools: School[] = [];
  currentSchool: any;
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getGradeConfiguration();
    this.getSchools();
  }

  search() {
    // this.getCriteria();
    this.grade = this.gradeOld.filter((x) => x.name?.toLowerCase()?.includes(this.keySearch?.toLowerCase()));
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required]],
      assessmentCriteriaGroupId: [""]
    });
  }
  getSchools() {
    // call api get all school
    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.schools = r.data;
      const schoolId = localStorage.getItem("school_id");
      this.currentSchool = this.schools[0];
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

  showModel(id = ""): void {
    if (id != "") {
      this.isCreate = false;
      const data = this.grade.find((x) => x.id == id);
      this.validateForm = this.fb.group({
        id: [data?.id],
        name: [data?.name, [Validators.required]],
        schoolId: [data?.schoolId],
        maximumScore: [data?.maximumScore],
        minimumScore: [data?.minimumScore],
        description: [data?.description],
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
        schoolId: [this.currentSchool.id],
        maximumScore: [0],
        minimumScore: [0],
        description: [""],
      });
    }
    this.isVisible = true;
  }

  getGradeConfiguration() {
    this.apiService.getGradeConfiguration().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.grade = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.grade = r.data;
      this.gradeOld = JSON.parse(JSON.stringify(this.grade));
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");

    });
  }

  removeGradeConfiguration(id: string | undefined) {
    if (typeof id == "undefined") return;

    this.apiService.removeGradeConfiguration(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.grade = [];
        this.getGradeConfiguration();
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.createMessage("success", "Xóa thành công");
      this.getGradeConfiguration();
    }, () => {
      this.grade = this.grade.filter(x => x.id != id);
    });
  }

  postGradeConfigurations() {
    const valueOfForm = this.validateForm.value;
    delete valueOfForm?.id;
    // call api create teacher-group
    this.apiService.postGradeConfiguration(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        this.getGradeConfiguration();
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo thành công");
      this.getGradeConfiguration();
    }, () => {

    });
  }

  putGradeConfiguration() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    this.apiService.putGradeConfiguration(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        this.getGradeConfiguration();
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật thành công");
      this.getGradeConfiguration();
    }, () => {
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
