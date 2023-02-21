import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseApi} from "../../core/models/response-api";
import {AssessmentCriteriaGroup} from "../../core/models/assessment-criteria-group";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private domain = environment.domain;

    constructor(private http: HttpClient) {
    }

    public getAssessmentCriteriaGroups() {
        return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(`${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria-group`);
    }
}
