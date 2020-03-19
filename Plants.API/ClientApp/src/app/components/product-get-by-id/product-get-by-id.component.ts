import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Guid } from "guid-typescript";
import { ProductService } from "src/app/services/product.service";
import { ProductModel } from "src/app/models/product.model";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoryModel } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { SharedService } from "src/app/services/shared.service";
import { NgbCarousel } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'product-get-by-id',
    templateUrl: './product-get-by-id.component.html',
    styleUrls: ['./product-get-by-id.component.css']
})
export class ProductGetByIDComponent {
    icon = faArrowLeft;
    private _productID: Guid;
    private _product: ProductModel = new ProductModel();
    private _category: CategoryModel = new CategoryModel();
    private _serviceProduct: ProductService;
    private _serviceCategory: CategoryService;
    private _isShowFullImage: boolean = false;
    private _fullImagePath: string = "";

    @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

    constructor(private activateRoute: ActivatedRoute, serviceProduct: ProductService, serviceCategory: CategoryService, private _sharedService: SharedService, private router: Router) {
        this._serviceProduct = serviceProduct;
        this._serviceCategory = serviceCategory;
    }

    ngOnInit() {
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        ).subscribe(response => {
            this._productID = Guid.parse(response);
            this._serviceProduct.getByID(this._productID).subscribe(response => {
                this._product = response;
                if (this._product.imagePath == "") {
                    this._product.imagePath = "Resources\\Images\\default-tree.png";
                }
                this.getParentCategory(response.categoryID);
            });
        });
    }

    getParentCategory(categoryID: Guid) {
        this._serviceCategory.getByID(categoryID).subscribe(response => {
            this._category = response;
        });
    }

    backToCategory() {
        this.router.navigate(['category/get', this._product.categoryID]);
    }

    showImage(path: string) {
        this._isShowFullImage = true;
        this._fullImagePath = path;
    }

    closeImageView() {
        this._isShowFullImage = false;
        this._fullImagePath = "";
    }

    goToNext() {
        this.carousel.next();
    }

    goToStart() {
        this.carousel.next();
    }

    delete() {
        this._serviceProduct.delete(this._product.id).subscribe(response => {
            this.router.navigate(['category/get', this._product.categoryID]);
        });
    }

    update() {
        this.router.navigate(['product/update', this._product.id]);
    }
}