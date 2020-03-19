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
    selector: 'product-update', 
    templateUrl: 'product-update.component.html',
    styleUrls: ['product-update.component.css']
})
export class ProductUpdateComponent {

    icon = faPaperclip;
    private model: ProductModel = new ProductModel();
    private productID: Guid;
    private choosedCategory: CategoryModel;
    private categories: CategoryModel[];
    private _serviceCategory: CategoryService;
    private _serviceProduct: ProductService;
    private _isShowFullImage: boolean = false;
    private _fullImagePath: string = "";

    constructor(private activateRoute: ActivatedRoute, serviceCategory: CategoryService, serviceProduct: ProductService, private _sharedService: SharedService, private router: Router) {
        this._serviceCategory = serviceCategory;
        this._serviceProduct = serviceProduct;
    }

    ngOnInit() {
        this.model.imagePath = "Resources\\Images\\default-tree.png";
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        ).subscribe(response => {
            this.productID = Guid.parse(response);
            this._serviceProduct.getByID(this.productID).subscribe(response => {
                this.model = response;
                this._serviceCategory.getByID(this.model.categoryID).subscribe(responseCategory => {
                    this.choosedCategory = responseCategory;
                });
                this.getCategories();
            });
        });
    }

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var fileToUpload = event.target.files[0];
            this._serviceProduct.uploadImage(fileToUpload).subscribe(response => {
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
        this.model.isAvailable = !this.model.isAvailable;
    }

    add() {
        if (this.model.name != "") {
            this.model.categoryID = this.choosedCategory.id;
            this._serviceProduct.update(this.model).subscribe(Response => {
                this.router.navigate(['product/get', this.model.id ])
            });
            
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