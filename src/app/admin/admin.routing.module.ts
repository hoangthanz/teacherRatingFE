import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {SelfAssessmentComponent} from "./pages/self-assessment/self-assessment.component";
import {SelfAssessmentListComponent} from "./pages/self-assessment-list/self-assessment-list.component";
import {UserManagementComponent} from "./pages/user-management/user-management.component";

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            {path: 'self-assessment', component: SelfAssessmentComponent},
            {path: 'self-assessment-list', component: SelfAssessmentListComponent},
            {path: 'user', component: UserManagementComponent},
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
