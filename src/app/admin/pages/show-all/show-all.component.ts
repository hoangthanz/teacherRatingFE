import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ResultRespond } from "../../../core/enums/result-respond";
import { School } from "../../../core/models/school";
import { TeacherGroup } from "../../../core/models/teacher-group";

@Component({
  selector: "app-show-all",
  templateUrl: "./show-all.component.html",
  styleUrls: ["./show-all.component.css"]
})
export class ShowAllComponent extends BaseComponent implements OnInit {
  data: any[] = [];
  criteriaGroupsOld: any[] = [];
  keySearch = "";
  groupId = "";
  schools: School[] = [];
  currentSchool: any;
  teacherGroups: TeacherGroup[] = [];
  date = new Date();

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getSchools();
    this.search();
    this.getTeacherGroups();
  }

  getTeacherGroups() {
    this.apiService.getTeacherGroups().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teacherGroups = [];
      }
      this.teacherGroups = r.data;
    });
  }

  getSchools() {
    // call api get all school
    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.schools = r.data;
      const schoolId = localStorage.getItem("school_id");
      this.currentSchool = this.schools.find((x) => x.id == schoolId) || this.schools[0];
    });
  }

  ngOnInit(): void {

  }

  download() {
    this.apiService.download(this.currentSchool?.id, this.date.getFullYear().toString(), (this.date.getMonth() + 1).toString(), this.getUserId())
      .subscribe((response: any) => {
          const blob = new Blob([response],
            { type: "application/vnd.ms-excel" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Báo_cáo.xlsx`;
          link.click();
        },
        err => {
          this.message.warning("Tải báo cáo thất bại");
        }
      );
  }

  search() {
    let request: any = {
      schoolId: this.currentSchool?.id,
      groupId: this.groupId,
      assessmentCriteria: this.keySearch.toLowerCase().trim(),
      month: this.date.getMonth() + 1,
      year: this.date.getFullYear()
    };
    if (!this.groupId) {
      delete request.groupId;
    }
    if (!this.keySearch) {
      delete request.assessmentCriteria;
    }
    this.apiService.getAllSelfCriticism(request).subscribe((r) => {
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
