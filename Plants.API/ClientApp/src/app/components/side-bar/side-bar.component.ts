import { Component } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { CategoryModel } from "src/app/models/category.model";
import { SharedService } from "src/app/services/shared.service";
import { LoginService } from "src/app/services/login.service";

@Component({
    selector: "side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent {

    private _serviceCategory: CategoryService;
    private _serviceLogin: LoginService;
    private _categories: CategoryModel[];
    private _isShowCategories: boolean = true;

    constructor(serviceCategory: CategoryService, private _sharedService: SharedService, serviceLogin: LoginService) {
        this._serviceCategory = serviceCategory;
        this._serviceLogin = serviceLogin;
    }

    ngOnInit() {
        this._serviceLogin.logined().subscribe(response => {
            console.log(response);
            if (response != null) {
                this._sharedService._isAuthenticated = true;
            }
            else {
            }
        })
        this._serviceCategory.getAll().subscribe(response => {
            if (response != null) {
                this._categories = response;
                if (response.length == 0) {
                    this._isShowCategories = false;
                }
                else this._isShowCategories = true;
                console.log(response);
            }
        })
    }
}