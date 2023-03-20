import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { FormsModule } from '@angular/forms';
import { SelfAssessmentComponent } from './pages/self-assessment/self-assessment.component';
import { ApiService } from '../shared/services/api.service';
import { SharedModule } from '../shared/shared.module';
import { SelfAssessmentListComponent } from './pages/self-assessment-list/self-assessment-list.component';
import { ViewSeflAssessmentComponent } from './pages/self-assessment-list/components/view-sefl-assessment/view-sefl-assessment.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { TeacherGroupComponent } from './pages/teacher-group/teacher-group.component';
import { CriteriaGroupComponent } from "./pages/criteria-group/criteria-group.component";
import { CriteriaComponent } from "./pages/criteria/criteria.component";
import { TeacherComponent } from "./pages/teacher/teacher.component";
import {SchoolManagementComponent} from "./pages/school-management/school-management.component";

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
    SchoolManagementComponent
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, SharedModule],
  providers: [ApiService],
})
export class AdminModule {}
