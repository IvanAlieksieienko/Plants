import { Guid } from "guid-typescript";

export class BasketModel {
  public productId: Guid;
  public count: number;

  constructor(productId: Guid, count: number) {
    this.productId = productId;
    this.count = count;
  }
}