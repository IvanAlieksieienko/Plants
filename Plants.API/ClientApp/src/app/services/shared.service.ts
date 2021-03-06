import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {
    public _isAuthenticated: boolean = false;
  public _isSideBarHidden: boolean = false;
  public _isBasketAvailable: boolean = true;
  public _isBasketModalOpened: boolean = false;
}