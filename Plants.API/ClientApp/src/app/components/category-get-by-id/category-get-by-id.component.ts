import { Component } from "@angular/core";
import { Guid } from "guid-typescript";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryModel } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'category-get-by-id',
    templateUrl: './category-get-by-id.component.html',
    styleUrls: ['./category-get-by-id.component.css']
})
export class CategoryGetByIDComponent {

    private categoryID: Guid;
    private category: CategoryModel;
    private subscription: Subscription;
    private _serviceCategory: CategoryService;
    constructor(private activateRoute: ActivatedRoute, serviceCategory: CategoryService) {
        this._serviceCategory = serviceCategory;
    }

    ngOnInit() {
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        ).subscribe(response => {
            this.categoryID = Guid.parse(response);
            console.log(this.categoryID);
            this._serviceCategory.getByID(this.categoryID).subscribe(response => {
                this.category = response;
                console.log(this.category);
                if (this.category.imagePath == "") {
                    this.category.imagePath = "Resources\\Images\\default-tree.png";
                }
            })
        });
    }
}