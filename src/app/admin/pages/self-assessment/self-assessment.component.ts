import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { AssessmentCriteriaGroup } from '../../../core/models/assessment-criteria-group';
import { ResultRespond } from '../../../core/enums/result-respond';
import { AssessmentCriteria } from '../../../core/models/assessment-criteria';
import { SelfCriticism } from '../../../core/models/self-criticism';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css'],
})
export class SelfAssessmentComponent {
  currentMonth = new Date().getMonth() + 1;

  assessmentCriteriaGroups: AssessmentCriteriaGroup[] = [];

  assessmentCriteria: AssessmentCriteria[] = [];
  selectedAssessmentCriteriaGroup: AssessmentCriteriaGroup[] = [];
  selectedAssessmentCriteria: AssessmentCriteria[] = [];

  assessmentCriteria1: AssessmentCriteria[][] = new Array<
    Array<AssessmentCriteria>
  >();

  createdSelfCriticism: SelfCriticism = new SelfCriticism();

  total: number = 0;

  currentSchoolId: string | any = '';
  months = [
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' },
  ];

  constructor(public apiService: ApiService, public msg: NzMessageService) {
    this.getAssessmentCriteriaGroups();
    this.getAssessmentCriteria();

    const currentUserId = localStorage.getItem('current_user_id');
    const teacherId = localStorage.getItem('teacher_id');
    this.currentSchoolId = localStorage.getItem('school_id');
    // set default value for createdSelfCriticism
    this.createdSelfCriticism.id = '';
    this.createdSelfCriticism.month = this.currentMonth;
    this.createdSelfCriticism.year = new Date().getFullYear();
    this.createdSelfCriticism.teacherId = teacherId ?? '';
    this.createdSelfCriticism.isSubmitted = false;
    this.createdSelfCriticism.createdDate = new Date().toISOString();
    this.createdSelfCriticism.userId = currentUserId ?? '';
    this.createdSelfCriticism.assessmentCriterias = [];
  }

  // get all assessment criteria group
  getAssessmentCriteriaGroups() {
    this.apiService.getAssessmentCriteriaGroups().subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.assessmentCriteriaGroups = response.data;
      }
    });
  }

  //get all assessment criteria
  getAssessmentCriteria() {
    this.apiService.getAssessmentCriteria().subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.assessmentCriteria = response.data;
        this.assessmentCriteria1 = [];
      }
    });
  }

  createSelfCriticism(created: SelfCriticism) {
    // add school id to created self criticism
    created.schoolId = this.currentSchoolId;
    created.assessmentCriterias.forEach((item) => {
      item.schoolId = this.currentSchoolId;
    });

    this.apiService.postSelfCriticism(created).subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.msg.create('success', `${response.message}`);
        this.createdSelfCriticism.assessmentCriterias = [];
        this.total = 0;
      } else {
        this.msg.create('error', `${response.message}`);
      }
    });
  }

  addAssessmentToList() {
    this.total = 0;
    this.createdSelfCriticism.assessmentCriterias.push(
      new AssessmentCriteria()
    );
    this.selectedAssessmentCriteriaGroup.push(new AssessmentCriteriaGroup());
    this.selectedAssessmentCriteria.push(new AssessmentCriteria());
    this.assessmentCriteria1.push(new Array<AssessmentCriteria>());

    console.log(this.createdSelfCriticism);
  }

  selectChangeAssessmentCriteriaGroup(
    selectedAssGroup: AssessmentCriteriaGroup,
    i: number
  ) {
    if (!this.createdSelfCriticism.assessmentCriterias.length) {
      return;
    }

    console.log(selectedAssGroup);
    this.assessmentCriteria1[i] = this.assessmentCriteria.filter(
      (item) => item.assessmentCriteriaGroupId == selectedAssGroup.id
    );
    this.createdSelfCriticism.assessmentCriterias[i] =
      this.assessmentCriteria.filter(
        (item) => item.assessmentCriteriaGroupId == selectedAssGroup.id
      )[0];
  }

  calculateTotal() {
    this.total = 0;
    this.createdSelfCriticism.assessmentCriterias.forEach((item) => {
      if(item.allowUpdateScore){
        this.total += item.value * item.quantity;
      }
      else{
        if (item.isDeduct) {
          this.total -= item.value * item.quantity;
        } else {
          this.total += item.value * item.quantity;
        }
      }
    });
  }

  changeValueOfIndexAssessment(selected: AssessmentCriteria, i: number) {
    this.createdSelfCriticism.assessmentCriterias[i] = selected;

    console.log(selected);
    this.calculateTotal();
  }

  saveAssessmentCriteria() {
    this.createSelfCriticism(this.createdSelfCriticism);
  }

  removeAssessment(i: number) {
    this.createdSelfCriticism.assessmentCriterias.splice(i, 1);
    this.selectedAssessmentCriteriaGroup.splice(i, 1);
    this.selectedAssessmentCriteria.splice(i, 1);
    this.assessmentCriteria1.splice(i, 1);
  }
}
