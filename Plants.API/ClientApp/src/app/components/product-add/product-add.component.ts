import { Component } from "@angular/core";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from "src/app/models/product.model";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { SharedService } from "src/app/services/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Guid } from "guid-typescript";
import { CategoryModel } from "src/app/models/category.model";

@Component({
    selector: 'product-add', 
    templateUrl: 'product-add.component.html',
    styleUrls: ['product-add.component.css']
})
export class ProductAddComponent {

    icon = faPaperclip;
    private model: ProductModel = new ProductModel();
    private categoryID: Guid;
    private choosedCategory: CategoryModel;
    private categories: CategoryModel[];
    private _serviceCategory: CategoryService;
    private _serviceProduct: ProductService;
    private _isAvailable: boolean = false;

    constructor(private activateRoute: ActivatedRoute, serviceCategory: CategoryService, serviceProduct: ProductService, private _sharedService: SharedService, private router: Router) {
        this._serviceCategory = serviceCategory;
        this._serviceProduct = serviceProduct;
    }

    ngOnInit() {
        this.model.imagePath = "Resources\\Images\\default-tree.png";
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        ).subscribe(response => {
            this.categoryID = Guid.parse(response);
            this._serviceCategory.getByID(this.categoryID).subscribe(response => {
                this.choosedCategory = response;
                console.log(this.choosedCategory);
                this.getCategories();
            })
        });
    }

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var fileToUpload = event.target.files[0];
            this._serviceCategory.uploadImage(fileToUpload).subscribe(response => {
                if (response != null && response.dbPath != "") {
                    console.log(response);
                    this.model.imagePath = "";
                    this.model.imagePath += response.dbPath;
                    console.log(this.model.imagePath);
                }
            });
        }
    }

    getCategories() {
        this._serviceCategory.getAll().subscribe(response => {
            this.categories = response;

        })
    }

    chooseCategory(category: CategoryModel) {
        this.choosedCategory = category;
        console.log(this.choosedCategory);
    }

    turnAvailabless() {
        this._isAvailable = !this._isAvailable;
    }

    add() {
        if (this.model.name != "") {
            this.model.categoryID = this.choosedCategory.id;
            this.model.isAvailable = this._isAvailable;
            this._serviceProduct.add(this.model).subscribe(Response => {
                this.router.navigate(['category/get', this.choosedCategory.id ])
            });
            
        }
        else {
            alert("Введите имя!");
        }
    }
}