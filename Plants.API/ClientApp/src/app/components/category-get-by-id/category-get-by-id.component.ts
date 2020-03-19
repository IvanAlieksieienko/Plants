import { Component } from "@angular/core";
import { Guid } from "guid-typescript";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryModel } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { switchMap } from 'rxjs/operators';
import { ProductService } from "src/app/services/product.service";
import { ProductModel } from "src/app/models/product.model";
import { SharedService } from "src/app/services/shared.service";

@Component({
    selector: 'category-get-by-id',
    templateUrl: './category-get-by-id.component.html',
    styleUrls: ['./category-get-by-id.component.css']
})
export class CategoryGetByIDComponent {

    private categoryID: Guid;
    private category: CategoryModel;
    private products: ProductModel[];
    private subscription: Subscription;
    private _serviceCategory: CategoryService;
    private _serviceProduct: ProductService;
    private _isShowFullImage: boolean = false;
    private _fullImagePath: string = "";
    private _deleteMode: boolean = false;
    private _deleteList: boolean[] = new Array();

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
                this.getCategoryProducts(response);
            })
        });
    }

    getCategoryProducts(category: CategoryModel) {
        this._serviceProduct.getByCategoryID(this.category.id).subscribe(response => {
            this.products = response;
            console.log(this.products);
        })
    }

    createProduct() {
        this.router.navigate(['product/create', this.category.id ]);
    }

    deleteCategory() {
        this._serviceCategory.delete(this.categoryID).subscribe();
        this.router.navigateByUrl("");
    }

    updateCategory() {
        this.router.navigate(['category/update', this.category.id]);
    }

    showImage(path: string) {
        this._isShowFullImage = true;
        this._fullImagePath = path;
    }

    closeImageView() {
        this._isShowFullImage = false;
        this._fullImagePath = "";
    }

    deleteProductsMode() {
        this._deleteMode = !this._deleteMode;
    }

    checkProduct(product: ProductModel) {
        this.router.navigate(['product/get', product.id]);
    }

    addProductToDeleteList(product: ProductModel) {
        var index = this.products.findIndex(p => p.id == product.id);
        this._deleteList[index] = true;
    }

    removeProductFromDeleteList(product: ProductModel) {
        var index = this.products.findIndex(p => p.id == product.id);
        this._deleteList[index] = false;
    }

    deleteList() {

        if (this._deleteList.length > 0) {
            for (var i = 0; i < this._deleteList.length; i++) {
                if (this._deleteList[i] == true) {
                    this._serviceProduct.delete(this.products[i].id).subscribe();
                }
                this.router.navigateByUrl("category/");
            }
        }
    }
}