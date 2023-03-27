import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing.module';
import {FormsModule} from '@angular/forms';
import {SelfAssessmentComponent} from './pages/self-assessment/self-assessment.component';
import {ApiService} from '../shared/services/api.service';
import {SharedModule} from '../shared/shared.module';
import {SelfAssessmentListComponent} from './pages/self-assessment-list/self-assessment-list.component';
import {
  ViewSeflAssessmentComponent
} from './pages/self-assessment-list/components/view-sefl-assessment/view-sefl-assessment.component';
import {UserManagementComponent} from './pages/user-management/user-management.component';
import {TeacherGroupComponent} from './pages/teacher-group/teacher-group.component';
import {CriteriaGroupComponent} from "./pages/criteria-group/criteria-group.component";
import {CriteriaComponent} from "./pages/criteria/criteria.component";
import {TeacherComponent} from "./pages/teacher/teacher.component";
import {SchoolManagementComponent} from "./pages/school-management/school-management.component";
import {ShowAllComponent} from "./pages/show-all/show-all.component";
import {GradeConfigurationComponent} from "./pages/grade-configuration/grade-configuration.component";
import { FileListComponent } from "./pages/file-list/file-list.component";
import { NzUploadModule } from "ng-zorro-antd/upload";

@NgModule({
  declarations: [
    AdminComponent,
    SelfAssessmentComponent,
    SelfAssessmentListComponent,
    ViewSeflAssessmentComponent,
    UserManagementComponent,
    TeacherGroupComponent,
    CriteriaGroupComponent,
    CriteriaComponent,
    TeacherComponent,
    SchoolManagementComponent,
    ShowAllComponent,
    GradeConfigurationComponent,
    FileListComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, SharedModule, NzUploadModule],
  providers: [ApiService],
})
export class AdminModule {}
