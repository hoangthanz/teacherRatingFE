import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin.routing.module";
import {FormsModule} from "@angular/forms";
import {SelfAssessmentComponent} from "./pages/self-assessment/self-assessment.component";
import {ApiService} from "../shared/services/api.service";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        AdminComponent,
        SelfAssessmentComponent
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
