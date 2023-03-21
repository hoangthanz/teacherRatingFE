import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import { CriteriaGroup } from "../../../core/models/criteria-group";
import { School } from "../../../core/models/school";

@Component({
  selector: "app-show-all",
  templateUrl: "./show-all.component.html",
  styleUrls: ["./show-all.component.css"]
})
export class ShowAllComponent extends BaseComponent implements OnInit {
  data: any[] = [];
  criteriaGroupsOld: any[] = [];
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
    this.data = this.criteriaGroupsOld.filter((x) => x.name?.includes(this.keySearch));
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

  }

  getCriteriaGroup() {
    this.apiService.getAllSelfCriticism("").subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.data = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.data = r.data;
      this.criteriaGroupsOld = JSON.parse(JSON.stringify(this.data));
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
      this.data = [];

    });
  }

}
