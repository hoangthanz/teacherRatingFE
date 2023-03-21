import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import { CriteriaGroup } from "../../../core/models/criteria-group";
import { School } from "../../../core/models/school";

@Component({
  selector: "app-criteria-group",
  templateUrl: "./criteria-group.component.html",
  styleUrls: ["./criteria-group.component.css"]
})
export class CriteriaGroupComponent extends BaseComponent implements OnInit {
  criteriaGroups: CriteriaGroup[] = [];
  criteriaGroupsOld: CriteriaGroup[] = [];
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
    this.getSchools();
    this.getCriteriaGroup();
  }

  search() {
    // this.getCriteriaGroup();
    this.criteriaGroups = this.criteriaGroupsOld.filter((x) => x.name?.includes(this.keySearch));
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required]],
      description: [""]
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

  showModelCriteriaGroup(id = ""): void {
    if (id != "") {
      this.isCreate = false;
      const criteriaGroup = this.criteriaGroups.find((x) => x.id == id);
      this.validateForm = this.fb.group({
        id: [criteriaGroup?.id],
        name: [criteriaGroup?.name, [Validators.required]],
        description: [criteriaGroup?.description],
        schoolId: [criteriaGroup?.schoolId]
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
        description: [""],
        schoolId: [this.currentSchool?.id]
      });
    }
    this.isVisible = true;
  }

  getCriteriaGroup() {
    this.apiService.getCriteriaGroups().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.criteriaGroups = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.criteriaGroups = r.data;
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
      this.criteriaGroups = [];
      for (let i = 0; i < 100; i++) {
        this.criteriaGroups.push({
          id: i.toString(),
          name: "Nhoms tiêu chí " + i.toString(),
          createdDate: "2023-03-17T16:43:40.252371",
          updatedDate: "2023-03-17T16:43:40.252371"
        });
      }
      this.criteriaGroupsOld = JSON.parse(JSON.stringify(this.criteriaGroups));
    });
  }

  removeCriteriaGroup(id: string | undefined) {
    if (typeof id == "undefined") return;

    this.apiService.removeCriteriaGroup(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.criteriaGroups = [];
        this.getCriteriaGroup();
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.createMessage("success", "Xóa  thành công");
      this.getCriteriaGroup();
    }, () => {
      this.criteriaGroups = this.criteriaGroups.filter(x => x.id != id);
    });
  }

  postCriteriaGroups() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    var teacherGroup = new CriteriaGroup();
    teacherGroup.name = valueOfForm.name;
    this.apiService.postCriteriaGroups(teacherGroup).subscribe((r) => {
      if (r.result != ResultRespond.Success) {

        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo  thành công");
      this.getCriteriaGroup();
    }, () => {
      this.isVisible = false;
      this.criteriaGroups.push({
        id: Date().toString(),
        name: valueOfForm.name,
        createdDate: "2023-03-17T16:43:40.252371",
        updatedDate: "2023-03-17T16:43:40.252371"
      });
    });
  }

  putCriteriaGroups() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    this.apiService.putCriteriaGroups(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật  thành công");
      this.getCriteriaGroup();
    }, () => {
      this.isVisible = false;
      this.criteriaGroups = this.criteriaGroups.map(x => {
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
