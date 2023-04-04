import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SelfAssessmentComponent } from './pages/self-assessment/self-assessment.component';
import { SelfAssessmentListComponent } from './pages/self-assessment-list/self-assessment-list.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { TeacherGroupComponent } from './pages/teacher-group/teacher-group.component';
import { CriteriaGroupComponent } from "./pages/criteria-group/criteria-group.component";
import { CriteriaComponent } from "./pages/criteria/criteria.component";
import { TeacherComponent } from "./pages/teacher/teacher.component";
import {SchoolManagementComponent} from "./pages/school-management/school-management.component";
import { ShowAllComponent } from "./pages/show-all/show-all.component";
import {GradeConfigurationComponent} from "./pages/grade-configuration/grade-configuration.component";
import { FileListComponent } from "./pages/file-list/file-list.component";
import {SelfAssessmentUpdateComponent} from "./pages/self-assessment-update/self-assessment-update.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'self-assessment', component: SelfAssessmentComponent },
      { path: 'self-assessment-update', component: SelfAssessmentUpdateComponent },
      { path: 'self-assessment-list', component: SelfAssessmentListComponent },
      { path: 'user', component: UserManagementComponent },
      { path: 'school', component: SchoolManagementComponent },
      { path: 'teacher-group', component: TeacherGroupComponent },
      { path: 'criteria-group', component: CriteriaGroupComponent },
      { path: 'criteria', component: CriteriaComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'show-all', component: ShowAllComponent },
      { path: 'grade', component: GradeConfigurationComponent },
      { path: 'files', component: FileListComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
