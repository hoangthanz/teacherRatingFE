import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseApi} from "../../core/models/response-api";
import {AssessmentCriteriaGroup} from "../../core/models/assessment-criteria-group";
import {SelfCriticism} from "../../core/models/self-criticism";
import {User} from "../../core/models/user";

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

    public getAssessmentCriteria() {
        return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(`${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria`);
    }

    public getAssessmentCriteriaByGroupId(id: string) {
        return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(`${this.domain}/api/AssessmentCriteriaGroup/get-assessment-criteria/${id}`);
    }

    public postSelfCriticism(requestBody: SelfCriticism) {
        return this.http.post<ResponseApi<AssessmentCriteriaGroup>>(`${this.domain}/api/SelfCriticism/create-self-criticism`, requestBody);
    }

    public getSelfCriticismByUserId(userId: string) {
        return this.http.get<ResponseApi<any>>(`${this.domain}/api/SelfCriticism/get-by-user/${userId}`);
    }

    public updateStatusAssessment(userId: string, isSubmitted: boolean, id: string) {
        return this.http.post<ResponseApi<any>>(`${this.domain}/api/SelfCriticism/update-status-self-criticism`,
            {
                userId: userId,
                isSubmitted: isSubmitted,
                id: id
            });
    }

    public getAllUser() {
        return this.http.get<ResponseApi<User[]>>(`${this.domain}/api/Authencation/get-all-user`);
    }

    public postUser(){
        return this.http.post<ResponseApi<User>>(`${this.domain}/api/User/create-user`, {
            "email": 123,
        });
    }
}
