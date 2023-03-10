import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseApi} from "../../core/models/response-api";
import {AssessmentCriteriaGroup} from "../../core/models/assessment-criteria-group";
import {SelfCriticism} from "../../core/models/self-criticism";
import {User} from "../../core/models/user";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Role} from "../../core/models/role";
import {TeacherGroup} from "../../core/models/teacher-group";

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

  public getUserBySchool(id: string) {
    return this.http.get<ResponseApi<User[]>>(`${this.domain}/api/User/get-user-by-school-id/${id}`);
  }

  public getRoles() {
    return this.http.get<ResponseApi<Role[]>>(`${this.domain}/api/User/get-roles`);
  }

  public postUser(createUser: any) {
    return this.http.post<ResponseApi<User>>(`${this.domain}/api/User/create-user`, {
      "userName": createUser.userName,
      "displayName": createUser.displayName,
      "email": createUser.email,
      "password": createUser.password,
      "confirmPassword": createUser.confirmPassword,
      "name": createUser.displayName,
      "phoneNumber": createUser.phoneNumber,
      "roles": [],
      "schoolId": createUser.schoolId,
    });
  }

  public removeUser(id: string) {
    return this.http.delete<ResponseApi<any>>(`${this.domain}/api/User/remove-user/${id}`);
  }


  public getTeacherGroups() {
    return this.http.get<ResponseApi<TeacherGroup[]>>(`${this.domain}/api/TeacherGroup`);
  }

  public getTeacherGroupById(id: string) {
    return this.http.get<ResponseApi<TeacherGroup>>(`${this.domain}/api/TeacherGroup/${id}`);
  }

  public postTeacherGroup(teacherGroup: TeacherGroup) {
    return this.http.post<ResponseApi<any>>(`${this.domain}/api/TeacherGroup/create`,
      teacherGroup);
  }

  public putTeacherGroup(teacherGroup: TeacherGroup) {
    return this.http.put<ResponseApi<any>>(`${this.domain}/api/TeacherGroup/update/${teacherGroup.id}`,
      teacherGroup);
  }

  public removeTeacherGroup(id: string) {
    return this.http.delete<ResponseApi<any>>(`${this.domain}/api/TeacherGroup/${id}`);
  }

  public getAllSchool() {
    return this.http.get<ResponseApi<any>>(`${this.domain}/api/School/get-all`);
  }
}
