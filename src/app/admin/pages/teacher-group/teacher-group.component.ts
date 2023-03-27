import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { ApiService } from "../../../shared/services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TeacherGroup } from "../../../core/models/teacher-group";
import { ResultRespond } from "../../../core/enums/result-respond";
import { ResponseApi } from "../../../core/models/response-api";
import { Teacher } from "../../../core/models/teacher";
import { RequestCreateTeacherGroupModel } from "../../../core/models/request/request-create-teacher-group.model";

@Component({
  selector: "app-teacher-group",
  templateUrl: "./teacher-group.component.html",
  styleUrls: ["./teacher-group.component.css"]
})
export class TeacherGroupComponent extends BaseComponent implements OnInit {

  nameSearch = "";
  isVisibleCreateUpdate = false;
  isCreate = true;

  isVisibleDelete = false;
  isDeleteLoading = false;

  idUpdate = '';
  idDelete = '';
  nameDelete = '';

  listTeacher: Teacher[] = [];
  listShowTeacher: Array<{ value: string; label: string }> = [];

  teacherGroups: TeacherGroup[] = [];
  allTeacherGroups: TeacherGroup[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;

  currentSchoolId = localStorage.getItem('school_id');
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.currentSchoolId = localStorage.getItem('school_id');
    this.getTeacherGroups();
  }

  ngOnInit(): void {
    this.getTeachersBySchool()
  }

  getTeacherGroups() {
    this.apiService.getTeacherGroups().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teacherGroups = [];
        this.allTeacherGroups = [];
        this.createMessage('error', 'Lỗi không lấy được dữ liệu');
      }
      this.teacherGroups = r.data;
      this.allTeacherGroups = r.data;
    });
  }

  getTeachersBySchool = () => {
    this.apiService.getTeacherBySchoolId(this.currentSchoolId ?? '').subscribe(
      (res: Teacher[]) => {
        this.listTeacher = res;
        this.listShowTeacher = this.listTeacher.filter(x => x.groupId == null).map(item => ({
          value: item.id ?? "",
          label: item.name ?? ""
        }));
      },error => {
        this.listTeacher = [];
      }
    )
  }

  public searchName = () => {
    this.teacherGroups = this.allTeacherGroups;
    if(this.nameSearch !== '')
      this.teacherGroups = this.teacherGroups.filter(x => x.name.includes(this.nameSearch.trim().toLowerCase()));
  }

  openCreateUpdateDialog = (isCreate: boolean, data?: TeacherGroup) => {
    this.isVisibleCreateUpdate = true;
    this.isCreate = isCreate;

    if(isCreate) {
      this.listShowTeacher = this.listTeacher.filter(x => x.groupId == null).map(item => ({
        value: item.id ?? "",
        label: item.name ?? ""
      }));
      this.idUpdate = "";
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        teacherIds: [[]],
        period1Score: [0, [Validators.required]],
        period2Score: [0, [Validators.required]],
        yearScore: [new Date().getFullYear(), [Validators.required]],
        description: [null]
      });
    }
    else {
      this.listShowTeacher = this.listTeacher.filter(x => x.groupId == null ||
        data?.id == x.groupId
      ).map(item => ({
        value: item.id ?? "",
        label: item.name ?? ""
      }));
      this.idUpdate = data?.id ?? "";
      this.validateForm = this.fb.group({
        name: [data?.name, [Validators.required]],
        teacherIds: [data?.teacherIds],
        period1Score: [data?.period1Score, [Validators.required]],
        period2Score: [data?.period2Score, [Validators.required]],
        yearScore: [data?.yearScore, [Validators.required]],
        description: [data?.description]
      });
    }
  }

  openDeleteDialog = (data: TeacherGroup) => {
    this.isVisibleDelete = true;
    this.idDelete = data.id;
    this.nameDelete =  data.name;
  }

  handleCancelCreateUpdate = (): void => {
    this.isVisibleCreateUpdate = false;
  }

  submit = () => {

    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return;
    }

    const request: RequestCreateTeacherGroupModel = {
      name: this.validateForm.controls['name'].value,
      teacherIds: this.validateForm.controls['teacherIds'].value,
      period1Score: this.validateForm.controls['period1Score'].value,
      period2Score: this.validateForm.controls['period2Score'].value,
      yearScore: this.validateForm.controls['yearScore'].value,
      description: this.validateForm.controls['description'].value,
      isDeleted: false,
      schoolId: this.currentSchoolId ?? '',
      totalMember: this.validateForm.controls['teacherIds'].value.length
    }

    if(this.isCreate){
      this.apiService.postTeacherGroup(request).subscribe(
        (res:ResponseApi<any>) => {
          if (res.result !== 0){
            this.message.create('error', 'Thêm mới thông tin tổ thất bại');
            return;
          }
          this.message.create('success', 'Thêm mới thông tin tổ thành công');
          this.isVisibleCreateUpdate = false;

          const request = {
            groupId: res.data.id,
            teacherIds: this.validateForm.controls['teacherIds'].value
          }

          this.apiService.addTeacherToGroup(request).subscribe(
            (res:ResponseApi<any>) => {
              if(res.result === 0){
                this.getTeacherGroups();
              }
              else {
                this.message.create('error', 'Thêm mới thông tin tổ thất bại');
              }
            }
          );

          this.getTeacherGroups();

        },error => {
        this.message.create('error', 'Xảy ra lỗi trong quá trình thêm mới thông tin tổ');
      }
      );
    }
    else {
      request.id = this.idUpdate;
      this.apiService.putTeacherGroup(request).subscribe(
        (res:ResponseApi<any>) => {
          if (res.result !== 0){
            this.message.create('error', 'Cập nhật thông tin tổ thất bại');
            return;
          }
          this.message.create('success', 'Cập nhật thông tin tổ thành công');
          this.isVisibleCreateUpdate = false;


          const request = {
            groupId: this.idUpdate,
            teacherIds: this.validateForm.controls['teacherIds'].value
          }

          this.apiService.addTeacherToGroup(request).subscribe(
            (res:ResponseApi<any>) => {
              if(res.result === 0){
                this.getTeacherGroups();
              }
              else {
                this.message.create('error', 'Thêm mới thông tin tổ thất bại');
              }
            }
          );

        },error => {
          this.message.create('error', 'Xảy ra lỗi trong quá trình cập nhật thông tin tổ');
        }
      );

    }


  }

  handleCancelDelete = (): void => {
    this.idDelete = '';
    this.nameDelete = '';
    this.isVisibleDelete = false;
  }

  confirmDelete = () => {
    this.isDeleteLoading = true;
    this.apiService.removeTeacherGroup(this.idDelete).subscribe(
      (res:ResponseApi<any>) => {
        if(res.result !== 0) {
          this.message.create('error', 'Xóa thông tin tổ thất bại');
          this.isDeleteLoading = false;
          return;
        }
        this.message.create('success', 'Xóa thông tin tổ thành công');
        this.isVisibleDelete= false;
        this.isDeleteLoading = false;
        this.getTeacherGroups();
      }, error => {
        this.message.create('error', 'Xảy ra lỗi trong quá trình xóa thông tin tổ');
        this.isDeleteLoading = false;
      }
    )

  }


}
