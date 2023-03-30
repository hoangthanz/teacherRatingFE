import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../../../shared/components/base/base.component";
import {ApiService} from "../../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResultRespond} from "../../../core/enums/result-respond";
import {School} from "../../../core/models/school";
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: "app-file-list",
  templateUrl: "./file-list.component.html",
  styleUrls: ["./file-list.component.css"]
})
export class FileListComponent extends BaseComponent implements OnInit {
  fileArr: any[] = [];
  fileArrOld: any[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;
  keySearch = "";
  schools: School[] = [];
  currentSchool: any;
  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getSchools();
    // this.getData();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


  search() {
    // this.getCriteriaGroup();
    this.fileArr = this.fileArrOld.filter((x) => x.fileName?.toLowerCase()?.includes(this.keySearch?.toLowerCase()));
  }

  getSchools() {
    // call api get all school
    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.schools = r.data;
      const schoolId = localStorage.getItem("school_id");
      this.currentSchool = this.schools.find(x => x?.id == schoolId) ?? this.schools[0];
      this.getData();
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
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: 'image/png'});
    return blob;
  }

  downloadFile(data: any): void {
    this.apiService.downLoadFile(data?.id).subscribe((r) => {
      const blob = new Blob([r],
        {type: 'application/vnd.ms-excel'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = data?.fileName;
      link.click();
    });
    // const byteString = window.atob(data?.fileData);
    // const arrayBuffer = new ArrayBuffer(byteString.length);
    // const int8Array = new Uint8Array(arrayBuffer);
    // for (let i = 0; i < byteString.length; i++) {
    //   int8Array[i] = byteString.charCodeAt(i);
    // }
    // const blobFile = new Blob([int8Array]);
    // const imageFile = new File([blobFile], data?.fileName);
    // // const blob = new Blob([r],
    // //   {type: 'application/vnd.ms-excel'});
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blobFile);
    // link.download = data?.fileName;
    // link.click();
  }

  showModel(id = ""): void {
    if (id != "") {
      this.isCreate = false;
      const criteriaGroup = this.fileArr.find((x) => x.id == id);
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

  getData() {
    this.apiService.getFiles(this.currentSchool?.id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.fileArr = [];
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.fileArr = r.data;
      this.fileArrOld = JSON.parse(JSON.stringify(this.fileArr));
    }, () => {
      this.createMessage("error", "Lỗi không lấy được dữ liệu");
    });
  }

  removeFile(id: string) {
    if (typeof id == "undefined") return;

    this.apiService.removeFiles(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.fileArr = [];
        this.getData();
        this.createMessage("error", "Lỗi không lấy được dữ liệu");
      }

      this.createMessage("success", "Xóa  thành công");
      this.getData();
    }, () => {
      this.fileArr = this.fileArr.filter(x => x.id != id);
    });
  }

  createFile() {
    const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    delete valueOfForm?.id;
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append("FileDetails", file);
      // formData.append("FileType", file.type);
    });
    formData.append("Name", valueOfForm.name);
    formData.append("Description", valueOfForm.description);
    formData.append("SchoolId", this.currentSchool?.id);
    this.uploading = true;
    this.apiService.postFiles(formData).subscribe((r) => {
      if (r?.result != ResultRespond.Success) {
        this.createMessage("error", r?.message);
        this.getData();
        this.fileList = [];
        return;
      }
      this.fileList = [];
      this.isVisible = false;
      this.createMessage("success", "Tạo  thành công");
      this.getData();
    }, () => {
      // this.isVisible = false;
      this.fileList = [];
    });
  }

  putCriteriaGroups() {
    /*const valueOfForm = this.validateForm.value;
    // call api create teacher-group
    this.apiService.putCriteriaGroups(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage("error", r.message);
        this.getData();
        return;
      }
      this.isVisible = false;
      this.createMessage("success", "Cập nhật  thành công");
      this.getData();
    }, () => {
      this.isVisible = false;
    });*/
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
