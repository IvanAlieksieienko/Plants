import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BasketModel } from "../../models/basket.model";
import { ProductModel } from "../../models/product.model";
import { BasketService } from "../../services/basket.service";
import { ProductService } from "../../services/product.service";
import { SharedService } from "../../services/shared.service";
import { faWindowClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  closeIcon = faWindowClose;
  minusIcon = faMinus;
  plusIcon = faPlus;

  public _serviceBasket: BasketService;
  public _serviceProduct: ProductService;

  _basketData: Array<TempBasketModel>;

  constructor(serviceBasket: BasketService,
    serviceProduct: ProductService,
    public _sharedService: SharedService,
    public router: Router
  ) {
    this._serviceBasket = serviceBasket;
    this._serviceProduct = serviceProduct;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._serviceBasket.getAll().subscribe(res => {
      if (!this.checkData(res)) return;
      this._basketData = new Array<TempBasketModel>();
      res.forEach(bModel => {
        this._serviceProduct.getByID(bModel.productId).subscribe(pRes => {
          this._basketData.push(new TempBasketModel(pRes, bModel.count));
        });
      });
    });
  }

  increase(basketModel: TempBasketModel) {
    basketModel.count++;
    this._serviceBasket.update(new BasketModel(basketModel.product.id, basketModel.count)).subscribe();
  }

  decrease(basketModel: TempBasketModel) {
    basketModel.count--;
    if (basketModel.count == 0) {
      this._serviceBasket.delete(basketModel.product).subscribe();
      this.removeElement(this._basketData, basketModel);
      if (this._basketData.length == 0) {
        this._sharedService._isBasketAvailable = false;
      }
      return;
    }
    this._serviceBasket.update(new BasketModel(basketModel.product.id, basketModel.count)).subscribe();
  }

  checkData(data: BasketModel[]): boolean {
    if (data == undefined || data == null || data.length == 0) {
      this._sharedService._isBasketAvailable = false;
      return false;
    }
    this._sharedService._isBasketAvailable = true;
    return true;
  }

  closeModal() {
    this._sharedService._isBasketModalOpened = false;
  }

  removeElement(arr: Array<TempBasketModel>, elem: TempBasketModel) {
    const index = arr.indexOf(elem);
    if (index > -1) arr.splice(index, 1);
  }

  getTotalSum(): number {
    var res = this._basketData.map(b => b.count * b.product.price).reduce((prev, next) => prev + next, 0);
    return res;
  }

  goToOrderPage() {
    this._sharedService._isBasketModalOpened = false;
    this.router.navigate(["orderPage"]);
  }
}

export class TempBasketModel {

  public product: ProductModel;
  public count: number;

  constructor(product: ProductModel, count: number) {
    this.product = product;
    this.count = count;
  }
}