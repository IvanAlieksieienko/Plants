import { Component } from "@angular/core";
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from "src/app/services/shared.service";
import { LoginService } from "src/app/services/login.service";

@Component({
    selector: "head-bar",
    templateUrl: "./head-bar.component.html",
    styleUrls: ["./head-bar.component.css"]
})
export class HeadBarComponent {
    mainIcon = faSeedling;
    private _serviceLogin: LoginService;

    constructor(private _sharedService: SharedService, serviceLogin: LoginService) {
        this._serviceLogin = serviceLogin;
    }
    
    ngOnInit() {
        this._serviceLogin.logined().subscribe(b=> {
            console.log(b);
            if (b == true) {
                this._sharedService._isShowLoginButton = false;

            }
        })
    }

    logout() {
        this._serviceLogin.logout().subscribe(b=> {
            this._sharedService._isShowLoginButton = true;
        })
    }
}