import { Component } from "@angular/core";
import { AdminModel } from "src/app/models/login.model";
import { LoginService } from "src/app/services/login.service";
import { SharedService } from "src/app/services/shared.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    private loginString: string;
    private passwordString: string;
    private _serviceLogin: LoginService;

    constructor(serviceLogin: LoginService, private _sharedService: SharedService, private router: Router) {
        this._serviceLogin = serviceLogin;
    }

    ngOnInit() {

    }

    login() {
        var model = new AdminModel();
        model.Login = "";
        model.Password = "";
        model.Login = this.loginString;
        model.Password = this.passwordString;
        console.log(model);
        console.log(this.loginString + this.passwordString);
        if ((model.Login != "" && model.Login != undefined) && (model.Password != "" && model.Password != undefined)) {
            this._serviceLogin.login(model).subscribe(response => {
                if (response != null) {
                    this._sharedService._isAuthenticated = true;
                    this.router.navigateByUrl("");
                }
                else {
                    alert("Логин и пароль были введены неверно!");
                }
            })
        }
        else {
            alert("Поля пустые!");
        }
    }
}