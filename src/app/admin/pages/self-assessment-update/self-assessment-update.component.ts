import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {AssessmentCriteriaGroup} from '../../../core/models/assessment-criteria-group';
import {ResultRespond} from '../../../core/enums/result-respond';
import {AssessmentCriteria} from '../../../core/models/assessment-criteria';
import {SelfCriticism} from '../../../core/models/self-criticism';
import {NzMessageService} from 'ng-zorro-antd/message';
import {GradeConfiguration} from "../../../core/models/criteria";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-self-assessment-update',
  templateUrl: './self-assessment-update.component.html',
  styleUrls: ['./self-assessment-update.component.css'],
})
export class SelfAssessmentUpdateComponent implements OnInit {
  currentMonth = new Date().getMonth() + 1;

  assessmentCriteriaGroups: AssessmentCriteriaGroup[] = [];

  assessmentCriteria: AssessmentCriteria[] = [];

  grade: GradeConfiguration[] = [];
  /* selectedAssessmentCriteriaGroup: AssessmentCriteriaGroup[] = [];
   selectedAssessmentCriteria: AssessmentCriteria[] = [];

   assessmentCriteria1: AssessmentCriteria[][] = new Array<
     Array<AssessmentCriteria>
   >();*/

  @Input() createdSelfCriticism: SelfCriticism = new SelfCriticism();


  total: number = 0;

  currentSchoolId: string | any = '';
  months = [
    {value: 1, label: 'Tháng 1'},
    {value: 2, label: 'Tháng 2'},
    {value: 3, label: 'Tháng 3'},
    {value: 4, label: 'Tháng 4'},
    {value: 5, label: 'Tháng 5'},
    {value: 6, label: 'Tháng 6'},
    {value: 7, label: 'Tháng 7'},
    {value: 8, label: 'Tháng 8'},
    {value: 9, label: 'Tháng 9'},
    {value: 10, label: 'Tháng 10'},
    {value: 11, label: 'Tháng 11'},
    {value: 12, label: 'Tháng 12'},
  ];

  public observerTransportSubcription!: Subscription;

  constructor(public apiService: ApiService,
              public router: Router,
              public msg: NzMessageService,) {
    this.getAssessmentCriteriaGroups();
    this.getAssessmentCriteria();
    this.getGradeConfiguration();

    const currentUserId = localStorage.getItem('current_user_id');
    const teacherId = localStorage.getItem('teacher_id');
    this.currentSchoolId = localStorage.getItem('school_id');
    // set default value for createdSelfCriticism
    this.createdSelfCriticism.id = '';
    this.createdSelfCriticism.month = this.currentMonth;
    this.createdSelfCriticism.year = new Date().getFullYear();
    this.createdSelfCriticism.teacherId = this.getTeacherId() ?? '';
    this.createdSelfCriticism.isSubmitted = false;
    this.createdSelfCriticism.createdDate = new Date().toISOString();
    this.createdSelfCriticism.userId = this.getUserId();
    this.createdSelfCriticism.assessmentCriterias = [];
  }

  public goPrevius() {
    this.router.navigateByUrl('admin/self-assessment-list').then(r => console.log(r));
  }

  public onTransportMessageListener() {
    this.observerTransportSubcription = this.apiService.dataSource.subscribe((data: any) => {
      if (data) {
        this.createdSelfCriticism = data;
        this.createdSelfCriticism.assessmentCriterias.forEach((item) => {
          item.assessmentCriteriaGroups = this.clone(this.assessmentCriteriaGroups);
          item.assessmentCriteria1 = this.clone(this.assessmentCriteria).filter((x: any) => x.assessmentCriteriaGroupId == item.assessmentCriteriaGroupId);

        });
      }
    });
  }

  getTeacherId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['TeacherId'];
    }
    return '';
  }

  getUserId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }
    return '';
  }

  getGradeConfiguration() {
    this.apiService.getGradeConfiguration().subscribe((r) => {
      if (r.result != ResultRespond.Success) {
        this.grade = [];
      }
      this.grade = r.data;
    });
  }

  // get all assessment criteria group
  getAssessmentCriteriaGroups() {
    this.apiService.getAssessmentCriteriaGroups().subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.assessmentCriteriaGroups = response.data;
        this.createdSelfCriticism.assessmentCriterias.forEach((item) => {
          item.assessmentCriteriaGroups = this.clone(this.assessmentCriteriaGroups);

        });
      }
    });
  }

  //get all assessment criteria
  getAssessmentCriteria() {
    this.apiService.getAssessmentCriteria().subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.assessmentCriteria = response.data;
        this.createdSelfCriticism.assessmentCriterias.forEach((item) => {
          item.assessmentCriteria1 = this.clone(this.assessmentCriteria).filter((x: any) => x.assessmentCriteriaGroupId == item.assessmentCriteriaGroupId);

        });
      }
    });
  }

  createSelfCriticism(created: SelfCriticism) {
    // add school id to created self criticism
    created.schoolId = this.currentSchoolId;
    created.assessmentCriterias.forEach((item) => {
      item.schoolId = this.currentSchoolId;
      if (!item.id) {
        item.id = Guid.newGuid().toString();
        if (item.value < 0) {
          item.isDeduct = true;
          item.value = Math.abs(item.value);
        } else {
          item.isDeduct = false;
        }
      }
    });

    this.apiService.updateSelfCriticism(created).subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.msg.create('success', `${response.message}`);
        this.createdSelfCriticism.assessmentCriterias = [];
        this.goPrevius();
      } else {
        this.msg.create('error', `${response.message}`);
      }
    });
  }

  public clone(object: unknown) {
    const ObjStr = JSON.stringify(object);
    return JSON.parse(ObjStr);
  }

  addAssessmentToList() {
    const assessmentCriteriaGroupId = this.assessmentCriteriaGroups[0].id;
    let assessmentCriteria: AssessmentCriteria = this.clone(this.assessmentCriteria)
      .filter((x: any) => x.assessmentCriteriaGroupId == assessmentCriteriaGroupId)[0];
    assessmentCriteria.assessmentCriteriaGroups = this.clone(this.assessmentCriteriaGroups);
    assessmentCriteria.assessmentCriteria1 = this.clone(this.assessmentCriteria).filter((x: any) => x.assessmentCriteriaGroupId == assessmentCriteriaGroupId);
    assessmentCriteria.actionDate = new Date();
    this.createdSelfCriticism.assessmentCriterias.push(assessmentCriteria);
  }

  selectChangeAssessmentCriteriaGroup(selectedAssGroup: string, i: number) {
    const tempAss = this.assessmentCriteria.filter((x: any) => x.assessmentCriteriaGroupId == selectedAssGroup);
    this.createdSelfCriticism.assessmentCriterias[i].assessmentCriteria1 = [];
    this.createdSelfCriticism.assessmentCriterias[i].assessmentCriteria1 = tempAss;
    this.createdSelfCriticism.assessmentCriterias[i].name = '';
    this.createdSelfCriticism.assessmentCriterias[i].id = '';
    this.createdSelfCriticism.assessmentCriterias[i].isDeduct = false;
    this.createdSelfCriticism.assessmentCriterias[i].quantity = 1;
    this.createdSelfCriticism.assessmentCriterias[i].value = 0;
  }

  changeValueOfIndexAssessment(id: string, index: number) {
    const selected = this.createdSelfCriticism.assessmentCriterias[index].assessmentCriteria1.filter((x: any) => x.id == id)[0];
    let i = this.createdSelfCriticism.assessmentCriterias[index];
    i.id = selected?.id ?? '';
    i.name = selected.name;
    i.value = selected.isDeduct ? -1 * selected.value : selected.value;
    i.unit = selected.unit;
    i.isDeduct = selected.isDeduct;
    i.quantity = 1;
    i.allowUpdateScore = selected.allowUpdateScore;
  }

  calculateTotal() {
    let total = 100;
    this.createdSelfCriticism.assessmentCriterias.forEach((item) => {
      if (item?.assessmentCriteria1 == null || item?.assessmentCriteria1?.length == 0) {
        total += item.value;
        // } else if (item.allowUpdateScore) {
        //   total += item.value * item.quantity;
      } else {
        // if (item.isDeduct) {
        total += item.value;
        // } else {
        //   total -= item.value * item.quantity;
        // }
      }
    });
    return total;
  }

  getGradeName() {
    this.grade.sort((a, b) => b.minimumScore! - a.minimumScore!);
    const grade = this.grade.filter(x => this.calculateTotal() >= x.minimumScore!);
    if (grade.length > 0) {
      return grade[0].name;
    } else {
      return 'Không hoàn thành';
    }
  }

  saveAssessmentCriteria() {
    this.createSelfCriticism(this.createdSelfCriticism);
  }

  removeAssessment(i: number) {
    this.createdSelfCriticism.assessmentCriterias.splice(i, 1);
    /*this.selectedAssessmentCriteriaGroup.splice(i, 1);
    this.selectedAssessmentCriteria.splice(i, 1);
    this.assessmentCriteria1.splice(i, 1);*/
  }

  ngOnInit(): void {
    this.onTransportMessageListener();
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
