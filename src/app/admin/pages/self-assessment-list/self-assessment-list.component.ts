import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ResultRespond} from '../../../core/enums/result-respond';
import {SelfCriticism} from '../../../core/models/self-criticism';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AssessmentCriteria} from "../../../core/models/assessment-criteria";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-self-assessment-list',
  templateUrl: './self-assessment-list.component.html',
  styleUrls: ['./self-assessment-list.component.css'],
})
export class SelfAssessmentListComponent implements OnInit {

  public seflAssessmentList: SelfCriticism[] = [];
  public seflAssessmentSelect: SelfCriticism | any;
  public assessmentCriterias: AssessmentCriteria[] = [];
  public selectedAssessmentCriterias: string[] = [];
  public assessmentCriteriaUpdate: any[] = [];
  public isVisible = false;
  public isVisibleUpdate = false;
  public viewOfSelfAssessment: SelfCriticism = new SelfCriticism();
  public viewUpdateSelfAssessment: SelfCriticism = new SelfCriticism();
  public schools: any[] = [];
  public schoolId = '';
  public date = new Date();

  constructor(
    public apiService: ApiService,
    public router: Router,
    public message: NzMessageService,
  ) {
    this.getSelfAssessmentList();
  }

  ngOnInit(): void {
    this.getSchools();
    this.getAssessmentCriteria();
  }

  showModal(i: number): void {
    this.viewOfSelfAssessment = this.seflAssessmentList[i];
    this.isVisible = true;
  }

  public download(item: any) {
    this.apiService.download(this.schoolId, this.date.getFullYear().toString(), (this.date.getMonth() + 1).toString(), this.getUserId(), [])
      .subscribe((response: any) => {
          const blob = new Blob([response],
            {type: "application/vnd.ms-excel"});
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

  getUserId() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }
    return '';
  }

  showUpdateModal(i: number): void {
    this.viewUpdateSelfAssessment = this.seflAssessmentList[i];
    this.assessmentCriteriaUpdate = [...this.viewUpdateSelfAssessment.assessmentCriterias]

    for (let i = 0; i < this.assessmentCriteriaUpdate.length; i++) {
      const item = this.assessmentCriterias.find(x => x.name == this.assessmentCriteriaUpdate[i].name);
      if (item != null) {
        this.selectedAssessmentCriterias.push(item.id);
      }
    }
    this.selectedAssessmentCriterias = this.assessmentCriteriaUpdate.map(x => x.id);
    this.seflAssessmentSelect = this.seflAssessmentList[i];
    this.isVisibleUpdate = true;
  }

  public sendTransportMessage(message: any, link: string) {
    this.apiService.sendDataMessage(message);
    this.router.navigateByUrl(link).then(r => console.log(r));
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

  handleOkUpdate(): void {
    console.log("submit")
    this.isVisibleUpdate = false;

    const objectOfAssessment = (JSON.parse(JSON.stringify(this.viewUpdateSelfAssessment)));

    this.apiService.updateAssessment(objectOfAssessment).subscribe((r) => {
      if (r.result != ResultRespond.Success) return;
      this.getSelfAssessmentList();
      this.createMessage('success', 'Cập nhật thành công');
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCancelUpdate(): void {
    this.isVisibleUpdate = false;
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

  //get all assessment criteria
  getAssessmentCriteria() {
    this.apiService.getAssessmentCriteria().subscribe((response: any) => {
      if (response.result === ResultRespond.Success) {
        this.assessmentCriterias = response.data;
      }
    });
  }

  calculateTotal = (item: any) => {
    item.totalScore = item.value * item.quantity;
  }

  deleteAssessmentCriteria = (index: number) => {
    this.assessmentCriteriaUpdate.splice(index, 1);
  }

  changeAssessmentCriterias = (event: any, index: number) => {
    this.assessmentCriteriaUpdate[index] = this.assessmentCriterias.find(x => x.id == event);
  }

  addAssessmentCriterias = () => {
    this.assessmentCriteriaUpdate.push(new AssessmentCriteria)
  }
}


