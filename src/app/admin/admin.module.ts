import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin.routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AdminComponent
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
