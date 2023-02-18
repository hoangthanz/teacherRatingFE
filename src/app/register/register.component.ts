import {Component} from '@angular/core';
import {AuthenticationService} from "../core/guards/authentication.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public name: string = '';
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public phone: string = '';

    public agree: boolean = false;

    constructor(private authenticationService: AuthenticationService) {
    }

    register() {
        if (!this.agree) {
            alert("Bạn cần đồng ý các điều khoản của chúng tôi");
            return;
        }

        if (this.password !== this.confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(this.email)) {
            alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
            return;
        }
        this.authenticationService.register(this.name, this.email, this.password, this.confirmPassword, this.phone);
    }
}
