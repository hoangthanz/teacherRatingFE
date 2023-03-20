import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../shared/components/base/base.component";
import {ApiService} from "../../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResultRespond} from "../../../core/enums/result-respond";
import {School} from "../../../core/models/school";
import {RequestCreateSchoolModel} from "../../../core/models/request/request-create-school.model";
import {ResponseApi} from "../../../core/models/response-api";

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent extends BaseComponent implements OnInit {

  nameSearch = '';
  isVisibleCreateUpdate = false;
  isCreate = false;

  isVisibleDelete = false;
  isDeleteLoading = false;

  idUpdate = '';
  idDelete = '';
  nameDelete = '';

  validateForm!: UntypedFormGroup ;

  schools : School[] = [];
  allSchools : School[] = [];

  constructor(
    public _apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router,
  ) {
    super(router, message);

  }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools(){
    this._apiService.getAllSchool().subscribe(r => {
      if (r.result != ResultRespond.Success)
        return;
      this.schools = r.data;
      this.allSchools = r.data;
    },error => {
      this.schools = [];
      this.allSchools = [];
    })
  }

  openCreateUpdateDialog = (isCreate: boolean, data?: School) => {
    this.isVisibleCreateUpdate = true;
    this.isCreate = isCreate;

    if(isCreate){
      this.idUpdate = '';
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        address: [null, [Validators.required]],
        description: [null],
      });
    }else{
      this.idUpdate = data?.id ?? '';
      this.validateForm = this.fb.group({
        name: [data?.name, [Validators.required]],
        address: [data?.address, [Validators.required]],
        description: [data?.description],
      });
    }
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

    const condition: RequestCreateSchoolModel = {
      name : this.validateForm.controls['name'].value,
      address: this.validateForm.controls['address'].value,
      description : this.validateForm.controls['description'].value
    }

    if(this.isCreate){
      this._apiService.createSchool(condition).subscribe(
        (res: ResponseApi<any>) => {
          if (res.result !== 0){
            this.message.create('error', 'Thêm mới thông tin trường học thất bại');
            return;
          }
          this.message.create('success', 'Thêm mới thông tin trường học thành công');
          this.isVisibleCreateUpdate = false
          this.getSchools();
        },error => {
          this.message.create('error', 'Xảy ra lỗi trong quá trình thêm mới thông tin trường học');
        }
      )
    }
    else{
      condition.id = this.idUpdate;
      this._apiService.updateSchool(this.idUpdate,condition).subscribe(
        (res: ResponseApi<any>) => {
          if (res.result !== 0){
            this.message.create('error', 'Cập nhật thông tin trường học thất bại');
            return;
          }
          this.message.create('success', 'Cập nhật thông tin trường học thành công');
          this.isVisibleCreateUpdate = false
          this.getSchools();
        },error => {
          this.message.create('error', 'Xảy ra lỗi trong quá trình cập nhật thông tin trường học');
        }
      )
    }
  }

  openDeleteDialog = (data: School) => {
    this.isVisibleDelete = true;
    this.idDelete = data.id;
    this.nameDelete =  data.name;
  }

  handleCancelDelete = (): void => {
    this.idDelete = '';
    this.nameDelete = '';
    this.isVisibleDelete = false;
  }

  confirmDelete = () => {
    this.isDeleteLoading = true;
    this._apiService.deleteSchool(this.idDelete).subscribe(
      (res: ResponseApi<any>) => {
        if(res.result !== 0) {
          this.message.create('error', 'Xóa thông tin trường học thất bại');
          this.isDeleteLoading = false;
          return;
        }
        this.message.create('success', 'Xóa thông tin trường học thành công');
        this.isVisibleDelete= false;
        this.isDeleteLoading = false;
        this.getSchools();
      }, error => {
        this.message.create('error', 'Xảy ra lỗi trong quá trình xóa thông tin trường học');
        this.isDeleteLoading = false;
      }
    )
  }

  public searchName = () => {
    this.schools = this.allSchools;
    if(this.nameSearch !== '')
      this.schools = this.schools.filter(x => x.name.includes(this.nameSearch.trim().toLowerCase()));
  }

}
