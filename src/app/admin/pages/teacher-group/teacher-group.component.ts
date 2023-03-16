import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ApiService } from '../../../shared/services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherGroup } from '../../../core/models/teacher-group';
import { ResultRespond } from '../../../core/enums/result-respond';

@Component({
  selector: 'app-teacher-group',
  templateUrl: './teacher-group.component.html',
  styleUrls: ['./teacher-group.component.css'],
})
export class TeacherGroupComponent extends BaseComponent implements OnInit {
  teacherGroups: TeacherGroup[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  isCreate = true;

  currentSchoolId = localStorage.getItem('school_id');
  constructor(
    public apiService: ApiService,
    public override message: NzMessageService,
    private fb: UntypedFormBuilder,
    public override router: Router
  ) {
    super(router, message);
    this.getTeacherGroups();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
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

  showModelTeacherGroup(id = ''): void {
    if (id != '') {
      this.isCreate = false;
      const teacherGroup = this.teacherGroups.find((x) => x.id == id);
      this.validateForm = this.fb.group({
        id: [teacherGroup?.id],
        name: [teacherGroup?.name, [Validators.required]],
      });
    } else {
      this.isCreate = true;
      this.validateForm = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
      });
    }
    this.isVisible = true;
  }

  getTeacherGroups() {
    this.apiService.getTeacherGroups().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teacherGroups = [];
        this.createMessage('error', 'Lỗi không lấy được dữ liệu');
      }

      // set index for teacherGroups
      for (let i = 0; i < r.data.length; i++) {
        r.data[i].index = i + 1;
      }

      this.teacherGroups = r.data;
    });
  }

  removerTeacherGroup(id: string | undefined) {
    if (typeof id == 'undefined') return;

    this.apiService.removeTeacherGroup(id).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.teacherGroups = [];
        this.getTeacherGroups();
        this.createMessage('error', 'Lỗi không lấy được dữ liệu');
      }

      this.createMessage('success', 'Xóa tổ thành công');
      this.getTeacherGroups();
    });
  }

  createTeacherGroup() {
    const valueOfForm = this.validateForm.value;

    // call api create teacher-group
    var teacherGroup = new TeacherGroup();
    teacherGroup.id = '';
    teacherGroup.name = valueOfForm.name;
    teacherGroup.schoolId = this.currentSchoolId ?? '';
    this.apiService.postTeacherGroup(teacherGroup).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage('error', r.message);
        return;
      }
      this.createMessage('success', 'Tạo tổ thành công');
      this.getTeacherGroups();
    });
  }

  updateTeacherGroup() {
    const valueOfForm = this.validateForm.value;

    // call api create teacher-group

    valueOfForm.schoolId = this.currentSchoolId ?? '';
    this.apiService.putTeacherGroup(valueOfForm).subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.createMessage('error', r.message);
        return;
      }
      this.createMessage('success', 'Cập nhật tổ thành công');
      this.getTeacherGroups();
      this.isVisible = false;
    });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
