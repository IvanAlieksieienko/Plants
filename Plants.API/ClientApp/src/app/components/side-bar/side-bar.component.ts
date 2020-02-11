import { Component } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { CategoryModel } from "src/app/models/category.model";

@Component({
    selector: "side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent {

    private _serviceCategory: CategoryService;
    private _categories: CategoryModel[];

    constructor(serviceCategory: CategoryService) {
        this._serviceCategory = serviceCategory;
    }

    ngOnInit() {
        this._serviceCategory.getAll().subscribe(response => {
            if (response != null) {
                this._categories = response;
                console.log(response);
            }
        })
    }
}