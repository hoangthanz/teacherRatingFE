import {Component} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {ResponseApi} from "../../../core/models/response-api";
import {AssessmentCriteriaGroup} from "../../../core/models/assessment-criteria-group";
import {ResultRespond} from "../../../core/enums/result-respond";

@Component({
    selector: 'app-self-assessment',
    templateUrl: './self-assessment.component.html',
    styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent{

    public currentMonth = new Date().getMonth() + 1;

    public assessmentCriteriaGroups :AssessmentCriteriaGroup[] = [];

    constructor(private apiService: ApiService) {
        this.getAssessmentCriteriaGroups();
    }


    getAssessmentCriteriaGroups() {
        this.apiService.getAssessmentCriteriaGroups().subscribe((response: any) => {
            if(response.result === ResultRespond.Success) {
                this.assessmentCriteriaGroups = response.data;
            }
        })
    }

}
