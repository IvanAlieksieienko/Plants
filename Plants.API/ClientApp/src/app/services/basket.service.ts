import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
import { BasketModel } from "../models/basket.model";
import { ProductModel } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class BasketService {
  public url = "basket";

  constructor(public http: HttpClient) { }

  public getAll(): Observable<BasketModel[]> {
    return this.http.get<BasketModel[]>(this.url);
  }

  public getById(id: Guid): Observable<BasketModel> {
    return this.http.get<BasketModel>(this.url + "/" + id);
  }

  public add(product: ProductModel) {
    return this.http.get(this.url + "/add/" + product.id);
  }

  public update(basket: BasketModel) {
    return this.http.get(this.url + "/update/" + basket.productId + "/" + basket.count);
  }

  public delete(product: ProductModel) {
    return this.http.delete(this.url + "/" + product.id);
  }
}