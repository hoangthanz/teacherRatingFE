import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseApi} from "../../core/models/response-api";
import {AssessmentCriteriaGroup} from "../../core/models/assessment-criteria-group";
import {SelfCriticism} from "../../core/models/self-criticism";
import {User} from "../../core/models/user";
import {Role} from "../../core/models/role";
import {TeacherGroup} from "../../core/models/teacher-group";
import {CriteriaGroup} from "../../core/models/criteria-group";
import {Criteria, GradeConfiguration} from "../../core/models/criteria";
import {Teacher} from "../../core/models/teacher";
import {RequestCreateSchoolModel} from "src/app/core/models/request/request-create-school.model";
import {Observable} from "rxjs";
import {RequestCreateTeacherGroupModel} from "../../core/models/request/request-create-teacher-group.model";
import {RequsetCreateTeacherModel} from "../../core/models/request/requset-create-teacher.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private domain = environment.domain;

  constructor(private http: HttpClient) {
  }

  public download(schoolId: string, year: string, month: string, userId: string, groupIds : any): Observable<Blob> {
    return this.http.post(
      `${this.domain}/api/SelfCriticism/get-excel/${schoolId}/${year}/${month}/${userId}`,
      groupIds,
      {responseType: 'blob'}
    );
  }

  public downloadTeacherGroup(schoolId: string, year: string, month: string, userId: string,): Observable<Blob> {
    return this.http.post(
      `${this.domain}/api/TeacherGroup/get-teacher-by-group-by-grade`,
      {
        schoolId: schoolId,
        year: year,
        month: month,
        userId: userId
      },
      {responseType: 'blob'}
    );
  }

  public getAssessmentCriteriaGroups() {
    return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(
      `${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria-group`
    );
  }

  public getAssessmentCriteria() {
    return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(
      `${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria`
    );
  }

  public getAssessmentCriteriaByGroupId(id: string) {
    return this.http.get<ResponseApi<AssessmentCriteriaGroup>>(
      `${this.domain}/api/AssessmentCriteriaGroup/get-assessment-criteria/${id}`
    );
  }

  public postSelfCriticism(requestBody: SelfCriticism) {
    return this.http.post<ResponseApi<AssessmentCriteriaGroup>>(
      `${this.domain}/api/SelfCriticism/create-self-criticism`,
      requestBody
    );
  }

  public getSelfCriticismByUserId(userId: string) {
    return this.http.get<ResponseApi<any>>(
      `${this.domain}/api/SelfCriticism/get-by-user/${userId}`
    );
  }

  public updateStatusAssessment(
    userId: string,
    isSubmitted: boolean,
    id: string
  ) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/SelfCriticism/update-status-self-criticism`,
      {
        userId: userId,
        isSubmitted: isSubmitted,
        id: id,
      }
    );
  }

  public getAllUser() {
    return this.http.get<ResponseApi<User[]>>(
      `${this.domain}/api/Authencation/get-all-user`
    );
  }

  public getUserBySchool(id: string) {
    return this.http.get<ResponseApi<User[]>>(
      `${this.domain}/api/User/get-user-by-school-id/${id}`
    );
  }

  public getRoles() {
    return this.http.get<ResponseApi<Role[]>>(
      `${this.domain}/api/User/get-roles`
    );
  }

  public postUser(createUser: any) {
    return this.http.post<ResponseApi<User>>(
      `${this.domain}/api/User/create-user`,
      {
        userName: createUser.userName,
        displayName: createUser.displayName,
        email: createUser.email,
        password: createUser.password,
        confirmPassword: createUser.confirmPassword,
        name: createUser.displayName,
        phoneNumber: createUser.phoneNumber,
        roles: [],
        schoolId: createUser.schoolId,
      }
    );
  }

  public putUser(createUser: any) {
    return this.http.post<ResponseApi<User>>(
      `${this.domain}/api/User/update-user`,
      {
        userName: createUser.userName,
        displayName: createUser.displayName,
        email: createUser.email,
        password: createUser.password,
        confirmPassword: createUser.confirmPassword,
        name: createUser.displayName,
        phoneNumber: createUser.phoneNumber,
        id: createUser.id,
        schoolId: createUser.schoolId,
      }
    );
  }
  public removeUser(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/User/remove-user/${id}`
    );
  }

  public getTeacherGroups() {
    return this.http.get<ResponseApi<TeacherGroup[]>>(
      `${this.domain}/api/TeacherGroup`
    );
  }

  public getTeacherGroupById(id: string) {
    return this.http.get<ResponseApi<TeacherGroup>>(
      `${this.domain}/api/TeacherGroup/${id}`
    );
  }

  public postTeacherGroup(teacherGroup: RequestCreateTeacherGroupModel) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/TeacherGroup/create`,
      teacherGroup
    );
  }

  public putTeacherGroup(teacherGroup: RequestCreateTeacherGroupModel) {
    return this.http.put<ResponseApi<any>>(
      `${this.domain}/api/TeacherGroup/update/${teacherGroup.id}`,
      teacherGroup
    );
  }

  public addTeacherToGroup(request: any) {
    return this.http.put<ResponseApi<any>>(
      `${this.domain}/api/TeacherGroup/add-teacher-to-group`,
      request
    );
  }

  public removeTeacherGroup(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/TeacherGroup/${id}`
    );
  }

  public getAllSchool() {
    return this.http.get<ResponseApi<any>>(`${this.domain}/api/School/get-all`);
  }

  //nhom tieu chi

  public getCriteriaGroups() {
    return this.http.get<ResponseApi<CriteriaGroup[]>>(
      `${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria-group`
    );
  }

  public postCriteriaGroups(criteriaGroup: CriteriaGroup) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/create-assessment-criteria-group`,
      criteriaGroup
    );
  }

  public putCriteriaGroups(criteriaGroup: CriteriaGroup) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/update-assessment-criteria-group`,
      criteriaGroup
    );
  }

  public removeCriteriaGroup(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/delete-assessment-criteria-group/${id}`
    );
  }

  // tieu chi

  public getCriteria() {
    return this.http.get<ResponseApi<Criteria[]>>(
      `${this.domain}/api/AssessmentCriteriaGroup/get-all-assessment-criteria`
    );
  }


  public postCriteria(criteriaGroup: Criteria) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/create-assessment-criteria`,
      criteriaGroup
    );
  }

  public putCriterias(criteriaGroup: Criteria) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/update-assessment-criteria`,
      criteriaGroup
    );
  }

  public removeCriteria(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/AssessmentCriteriaGroup/delete-assessment-criteria/${id}`
    );
  }

  public getGradeConfiguration() {
    return this.http.get<ResponseApi<GradeConfiguration[]>>(
      `${this.domain}/api/GradeConfiguration`
    );
  }


  public postGradeConfiguration(body: GradeConfiguration) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/GradeConfiguration`,
      body
    );
  }

  public putGradeConfiguration(body: GradeConfiguration) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/GradeConfiguration/${body.id}`,
      body
    );
  }

  public removeGradeConfiguration(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/GradeConfiguration/${id}`
    );
  }

  // giao vien

  public getTeacher(schoolId: string) {
    return this.http.get<Teacher[]>(
      `${this.domain}/api/Teacher/get-by-school/${schoolId}`
    );
  }


  public postTeacher(model: RequsetCreateTeacherModel) {
    return this.http.post<ResponseApi<any>>(
      `${this.domain}/api/Teacher`,
      model
    );
  }

  public putTeachers(model: RequsetCreateTeacherModel) {
    return this.http.put<ResponseApi<any>>(
      `${this.domain}/api/Teacher`,
      model
    );
  }

  public removeTeacher(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/Teacher/${id}`
    );
  }

  public createSchool(request: RequestCreateSchoolModel) {
    return this.http.post<ResponseApi<any>>(`${this.domain}/api/School`,
      request);
  }

  public updateSchool(id: string, request: RequestCreateSchoolModel) {
    return this.http.put<ResponseApi<any>>(`${this.domain}/api/School/${id}`,
      request);
  }

  public deleteSchool(id: string) {
    return this.http.delete<ResponseApi<any>>(`${this.domain}/api/School/${id}`);
  }

  public getAllSelfCriticism(param: any) {
    return this.http.post<ResponseApi<any[]>>(
      `${this.domain}/api/SelfCriticism/get-by-condition`,
      param,
      {
        params: param
      }
    );
  }

  public getTeacherBySchoolId(schoolId: string) {
    return this.http.get<Teacher[]>(
      `${this.domain}/api/Teacher/get-by-school/${schoolId}`
    );
  }

  public getFiles(schoolId: string) {
    return this.http.get<ResponseApi<any[]>>(
      `${this.domain}/api/Upload/get-all/${schoolId}`
    );
  }


  // public postFiles(body: FormData) {
  //   return this.http.post<ResponseApi<any>>(`${this.domain}/api/Upload/PostMultipleFile`, body);
  // }
  public postFiles(body: FormData) {
    return this.http.post<ResponseApi<any>>(`${this.domain}/api/Upload/PostSingleFile`, body);
  }

  public downLoadFile(body: string) {
    return this.http.get(`${this.domain}/api/Upload/download/${body}`, {responseType: 'blob'});
  }

  public removeFiles(id: string) {
    return this.http.delete<ResponseApi<any>>(
      `${this.domain}/api/Files/${id}`
    );
  }
}
