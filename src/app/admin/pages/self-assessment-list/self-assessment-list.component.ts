import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ResultRespond} from '../../../core/enums/result-respond';
import {SelfCriticism} from '../../../core/models/self-criticism';
import {NzMessageService} from 'ng-zorro-antd/message';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-self-assessment-list',
  templateUrl: './self-assessment-list.component.html',
  styleUrls: ['./self-assessment-list.component.css'],
})
export class SelfAssessmentListComponent implements OnInit {
  constructor(public apiService: ApiService, public message: NzMessageService) {
    this.getSelfAssessmentList();
  }

  seflAssessmentList: SelfCriticism[] = [];

  isVisible = false;

  viewOfSelfAssessment: SelfCriticism = new SelfCriticism();
  schools: any[] = [];
  schoolId = '';
  date = new Date();

  ngOnInit(): void {
    this.getSchools();
  }

  showModal(i: number): void {
    this.viewOfSelfAssessment = this.seflAssessmentList[i];
    this.isVisible = true;
  }

  getSchools() {
    // call api get all school
    this.apiService.getAllSchool().subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.schools = r.data;
      const schoolId = localStorage.getItem("school_id");
      this.schoolId = this.schools.find(x => x.id == schoolId)?.id ?? this.schools[0]?.id;
    });
  }


  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getSelfAssessmentList() {
    const currentUserId = localStorage.getItem('current_user_id');
    if (currentUserId == null) return;
    this.apiService
      .getSelfCriticismByUserId(currentUserId)
      .subscribe((response: any) => {
        if (response.result === ResultRespond.Success) {
          this.seflAssessmentList = response.data;

          for (let i = 0; i < this.seflAssessmentList.length; i++) {
            this.seflAssessmentList[i].index = i + 1;
          }
        }
      });
  }

  updateSelfAssessment(selfCriticism: SelfCriticism, isSubmitted: boolean) {
    const currentUserId = localStorage.getItem('current_user_id');
    if (currentUserId == null) return;

    selfCriticism.isSubmitted = isSubmitted;
    this.apiService
      .updateStatusAssessment(currentUserId, isSubmitted, selfCriticism.id)
      .subscribe((response: any) => {
        if (response.result === ResultRespond.Success) {
          this.getSelfAssessmentList();
          this.createMessage('success', 'Cập nhật thành công');
        }
        this.getSelfAssessmentList();
        this.createMessage('warning', response.message);
      });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }

}
