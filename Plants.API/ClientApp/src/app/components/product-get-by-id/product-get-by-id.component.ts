import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Guid } from "guid-typescript";
import { ProductService } from "src/app/services/product.service";
import { ProductModel } from "src/app/models/product.model";
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoryModel } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { SharedService } from "src/app/services/shared.service";
import { NgbCarousel } from "@ng-bootstrap/ng-bootstrap";
import { BasketService } from "../../services/basket.service";

@Component({
  selector: 'product-get-by-id',
  templateUrl: './product-get-by-id.component.html',
  styleUrls: ['./product-get-by-id.component.css']
})
export class ProductGetByIDComponent {
  icon = faArrowLeft;
  buyIcon = faShoppingCart;
  public _productID: Guid;
  public _product: ProductModel = new ProductModel();
  public _category: CategoryModel = new CategoryModel();
  public _serviceProduct: ProductService;
  public _serviceCategory: CategoryService;
  public _serviceBasket: BasketService;
  public _isShowFullImage: boolean = false;
  public _fullImagePath: string = "";

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(public activateRoute: ActivatedRoute,
    serviceProduct: ProductService,
    serviceCategory: CategoryService,
    serviceBasket: BasketService,
    public _sharedService: SharedService,
    public router: Router) {
    this._serviceProduct = serviceProduct;
    this._serviceCategory = serviceCategory;
    this._serviceBasket = serviceBasket;
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

  addThisToBasket() {
    this._serviceBasket.add(this._product).subscribe(r => {
      this._serviceBasket.getAll().subscribe(res => {
        if (res == undefined || res == null || res.length == 0) {
          this._sharedService._isBasketAvailable = false;
          return;
        }
        this._sharedService._isBasketAvailable = true;
      });
    });
  }

  delete() {
    if (confirm("Уверены, что хотите удалить этот продукт?")) {
      this._serviceProduct.delete(this._product.id).subscribe(response => {
        this.router.navigate(['category/get', this._product.categoryID]);
      });
    }
  }

  update() {
    this.router.navigate(['product/update', this._product.id]);
  }
}