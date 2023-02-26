import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin.routing.module";
import {FormsModule} from "@angular/forms";
import {SelfAssessmentComponent} from "./pages/self-assessment/self-assessment.component";
import {ApiService} from "../shared/services/api.service";
import {SharedModule} from "../shared/shared.module";
import {SelfAssessmentListComponent} from "./pages/self-assessment-list/self-assessment-list.component";


@NgModule({
    declarations: [
        AdminComponent,
        SelfAssessmentComponent,
        SelfAssessmentListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    providers: [ApiService],
})
export class AdminModule {
}
