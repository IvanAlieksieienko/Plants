import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BasketService } from "../../services/basket.service";
import { SharedService } from "../../services/shared.service";
import { faWindowClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProductService } from "../../services/product.service";
import { TempBasketModel } from "../basket/basket.component";
import { BasketModel } from "../../models/basket.model";
import { CanComponentDeactivate } from "../../services/can-deactive.guard";
import { Observable } from "rxjs";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements CanComponentDeactivate {

  closeIcon = faWindowClose;
  minusIcon = faMinus;
  plusIcon = faPlus;

  public _serviceBasket: BasketService;
  public _serviceProduct: ProductService;

  _basketData: Array<TempBasketModel>;

  // order details
  firstName: string;
  secondName: string;
  patronymic: string;
  phoneNumber: string;
  region: string;
  city: string;
  street: string;
  appartment: string;
  deliveryType: string = "Самовывоз";
  isDeliveryInfoAvailable: boolean = false;

  constructor(serviceBasket: BasketService,
    serviceProduct: ProductService,
    public _sharedService: SharedService,
    public router: Router) {
    this._serviceBasket = serviceBasket;
    this._serviceProduct = serviceProduct;
  }

  ngOnInit() {
    this.getData();
    this._sharedService._isBasketAvailable = false;
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

  setDeliveryType(type: string) {
    this.deliveryType = type;
    if (type == "Доставка Новой Почтой") this.isDeliveryInfoAvailable = true;
    else this.isDeliveryInfoAvailable = false;
  }

  makeOrder() {
    if (
      (this.deliveryType == "Самовывоз" &&
          (!this.verifyString(this.firstName) ||
          !this.verifyString(this.phoneNumber))) ||
      (this.deliveryType == "Доставка Новой Почтой" && (
        (!this.verifyString(this.city) ||
          !this.verifyString(this.street))))) {
      alert("Введены некорректные данные!");
      return;
    }
    this.clearBasket();
    alert("Заказ успешно сформирован, ожидайте звонка для уточнения деталей!");
    this.router.navigateByUrl("");
  }

  clearBasket() {
    this._basketData.forEach(b => {
      this._serviceBasket.delete(b.product).subscribe();
    });
  }

  checkData(data: BasketModel[]): boolean {
    if (data == undefined || data == null || data.length == 0) {
      return false;
    }
    return true;
  }

  removeElement(arr: Array<TempBasketModel>, elem: TempBasketModel) {
    const index = arr.indexOf(elem);
    if (index > -1) arr.splice(index, 1);
  }

  getTotalSum(): number {
    var res = this._basketData.map(b => b.count * b.product.price).reduce((prev, next) => prev + next, 0);
    return res;
  }

  verifyString(str: string): boolean {
    if (str == undefined || str == null || str.length == 0) return false;
    return true;
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this._serviceBasket.getAll().subscribe(res => {
      if (res == undefined || res == null || res.length == 0) this._sharedService._isBasketAvailable = false;
      this._sharedService._isBasketAvailable = true;
    });
    return true;
  }
}