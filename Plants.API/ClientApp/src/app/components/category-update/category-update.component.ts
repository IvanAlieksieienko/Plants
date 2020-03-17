import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Guid } from "guid-typescript";
import { CategoryModel } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { SharedService } from "src/app/services/shared.service";
import { switchMap } from "rxjs/operators";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'category-update',
    templateUrl: 'category-update.component.html',
    styleUrls: ['category-update.component.css']
})
export class CategoryUpdateComponent {

    icon = faPaperclip;
    private categoryID: Guid;
    private category: CategoryModel;
    private _isShowFullImage: boolean = false;
    private _fullImagePath: string = "";
    private _serviceCategory: CategoryService;
    private _serviceProduct: ProductService;

    constructor(private activateRoute: ActivatedRoute, serviceCategory: CategoryService, serviceProduct: ProductService, private _sharedService: SharedService, private router: Router) {
        this._serviceCategory = serviceCategory;
        this._serviceProduct = serviceProduct;
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

    update() {
        if (this.category.name != "") {
            this._serviceCategory.update(this.category).subscribe(response => {
                this.router.navigate(['category/get', response.id ])
            });
            console.log(this.category.description);
        }
        else {
            alert("Введите имя!");
        }
    }

    showImage(path: string) {
        this._isShowFullImage = true;
        this._fullImagePath = path;
    }

    closeImageView() {
        this._isShowFullImage = false;
        this._fullImagePath = "";
    }
}