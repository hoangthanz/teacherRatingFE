import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../../../shared/components/base/base.component";
import {ApiService} from "../../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResultRespond} from "../../../core/enums/result-respond";
import {Criteria} from "../../../core/models/criteria";
import {CriteriaGroup} from "../../../core/models/criteria-group";
import {School} from "../../../core/models/school";

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
  checked = false;

  schools: School[] = [];
  currentSchool: any;
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getCriteria();
    this.getSchools();
    this.getCriteriaGroup();
  }

  search() {
    // this.getCriteria();
    this.criteria = this.criteriaOld.filter((x) => x.name?.toLowerCase()?.includes(this.keySearch?.toLowerCase()));
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
      this.currentSchool = this.schools.find(x=>x?.id == schoolId) ?? this.schools[0];
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
    this.checked = false;
    if (id != "") {
      this.isCreate = false;
      const criteriaGroup = this.criteria.find((x) => x.id == id);
        this.validateForm = this.fb.group({
        id: [criteriaGroup?.id],
        name: [criteriaGroup?.name, [Validators.required]],
        assessmentCriteriaGroupId: [criteriaGroup?.assessmentCriteriaGroupId],
        schoolId: [criteriaGroup?.schoolId],
        isDeduct: [criteriaGroup?.isDeduct],
        value: [criteriaGroup?.value],
        unit: [criteriaGroup?.unit],
        quantity: [criteriaGroup?.quantity],
        allowUpdateScore: [criteriaGroup?.allowUpdateScore],
      });
        this.checked = this.validateForm.controls['allowUpdateScore'].value;
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [""],
        name: ["", [Validators.required]],
        assessmentCriteriaGroupId: [this.criteriaGroups[0].id],
        schoolId: [this.currentSchool.id],
        isDeduct: [false],
        value: [0],
        unit: [""],
        quantity: [0],
        allowUpdateScore: [false]
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
      this.criteriaOld = JSON.parse(JSON.stringify(this.criteria));
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");

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

    delete valueOfForm?.id;
    this.apiService.postCriteria(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        this.getCriteria();
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Tạo thành công");
      this.getCriteria();
    }, () => {

    });
  }

  putCriterias() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    this.apiService.putCriterias(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        this.getCriteria();
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật thành công");
      this.getCriteria();
    }, () => {
    });
  }

  change = () => {
    this.checked = !this.checked;
    this.validateForm.controls['allowUpdateScore'].setValue(this.checked);
    console.log('hú: ', this.validateForm.controls['allowUpdateScore'].value)
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
