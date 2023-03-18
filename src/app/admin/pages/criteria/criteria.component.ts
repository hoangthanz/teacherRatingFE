import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import { Criteria } from "../../../core/models/criteria";
import { CriteriaGroup } from "../../../core/models/criteria-group";

@Component({
  selector: "app-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"]
})
export class CriteriaComponent extends BaseComponent implements OnInit {
  criteria: Criteria[] = [];
  criteriaOld: Criteria[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;
  keySearch = "";
  criteriaGroups: CriteriaGroup[] = [];

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getCriteria();
    this.getCriteriaGroup();
  }

  search() {
    // this.getCriteria();
    this.criteria = this.criteriaOld.filter((x) => x.name?.includes(this.keySearch));
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required]],
      criteriaGroupId: [""]
    });
  }

  getCriteriaGroup() {
    this.apiService.getCriteriaGroups().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.criteriaGroups = [];
      }
      this.criteriaGroups = r.data;
    }, () => {
      this.criteriaGroups = [];
      for (let i = 0; i < 10; i++) {
        this.criteriaGroups.push({
          id: i.toString(),
          name: "Nhoms tiêu chí " + i.toString(),
          createdDate: "2023-03-17T16:43:40.252371",
          updatedDate: "2023-03-17T16:43:40.252371"
        });
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

  showModelCriteria(id = ""): void {
    if (id != "") {
      this.isCreate = false;
      const criteriaGroup = this.criteria.find((x) => x.id == id);
      this.validateForm = this.fb.group({
        id: [criteriaGroup?.id],
        name: [criteriaGroup?.name, [Validators.required]],
        criteriaGroupId: [criteriaGroup?.criteriaGroupId]
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
        criteriaGroupId: [this.criteriaGroups[0].id]
      });
    }
    this.isVisible = true;
  }

  getCriteria() {
    this.apiService.getCriteria().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.criteria = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.criteria = r.data;
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
      this.criteria = [];
      for (let i = 0; i < 100; i++) {
        this.criteria.push({
          id: i.toString(),
          name: "Tiêu chí " + i.toString(),
          createdDate: "2023-03-17T16:43:40.252371",
          updatedDate: "2023-03-17T16:43:40.252371"
        });
      }
      this.criteriaOld = JSON.parse(JSON.stringify(this.criteria));
    });
  }

  removeCriteria(id: string | undefined) {
    if (typeof id == "undefined") return;

    this.apiService.removeCriteria(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.criteria = [];
        this.getCriteria();
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.createMessage("success", "Xóa thành công");
      this.getCriteria();
    }, () => {
      this.criteria = this.criteria.filter(x => x.id != id);
    });
  }

  postCriterias() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    var teacherGroup = new Criteria();
    teacherGroup.name = valueOfForm.name;
    this.apiService.postCriteria(teacherGroup).subscribe((r) => {
      if (r.result != ResultRespond.Success) {

        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo thành công");
      this.getCriteria();
    }, () => {
      this.isVisible = false;
      this.criteria.push({
        id: Date().toString(),
        name: valueOfForm.name,
        createdDate: "2023-03-17T16:43:40.252371",
        updatedDate: "2023-03-17T16:43:40.252371"
      });
    });
  }

  putCriterias() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    this.apiService.putCriterias(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật thành công");
      this.getCriteria();
    }, () => {
      this.isVisible = false;
      this.criteria = this.criteria.map(x => {
        if (x.id == valueOfForm.id) {
          x.name = valueOfForm.name;
          x.criteriaGroupId = valueOfForm.criteriaGroupId;
        }
        return x;
      });
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
