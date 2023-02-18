import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {CookieService} from "ngx-cookie";
import {DeviceDetectorService} from "ngx-device-detector";
import {NgxPermissionsService} from "ngx-permissions";
import {environment} from "../../../environments/environment";

class MatSnackBar {
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private refreshTokenTimeout: any;
    public permissions: string[] = [];

    public ipAddress = '';

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {
    }

    public getToken() {
        return sessionStorage.getItem('access_token');
    }

    public convertObjectToString = (object: any) => JSON.stringify(object);

    login = (username: string, password: string, hasRemember: boolean) => this.http.post<any>(`${environment.domain}/api/Authencation/login`, {
        email: username,
        password: password
    }).subscribe((response: any) => {
            localStorage.setItem('access_token', response.accessToken);
            sessionStorage.setItem('access_token', response.accessToken);
            const helper = new JwtHelperService();

            const decodedToken = helper.decodeToken(response.accessToken);
            localStorage.setItem('current_email', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
            localStorage.setItem('current_user_id', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);

            if(hasRemember) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('hasRemember', 'true');
            }


            // redirect to home page
            this.router.navigate(['/admin']);
        },
        (error) => {
            if (hasRemember) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('hasRemember', 'true');
            }
        });


    register = (name: string, email: string, password: string, confirmPassword: string, phone: string) => this.http.post<any>(`${environment.domain}/api/Authencation/register`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        phoneNumber: phone
    }).subscribe((response: any) => {
        if(response.success) {
            localStorage.setItem('username', email);
            localStorage.setItem('password', password);
            localStorage.setItem('hasRemember', 'true');
            this.router.navigate(['/login']);
        }

    });
}
