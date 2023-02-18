import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthenticationService} from "./core/guards/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie";

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthenticationService,
        JwtHelperService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
