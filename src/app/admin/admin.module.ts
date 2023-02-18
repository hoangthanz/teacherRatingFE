import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin.routing.module";
import {FormsModule} from "@angular/forms";
import {SelfAssessmentComponent} from "./pages/self-assessment/self-assessment.component";


@NgModule({
    declarations: [
        AdminComponent,
        SelfAssessmentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ],
    providers: [],
})
export class AdminModule {
}
