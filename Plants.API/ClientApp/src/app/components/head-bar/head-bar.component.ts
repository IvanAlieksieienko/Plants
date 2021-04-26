import { Component } from "@angular/core";
import { faSeedling, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from "src/app/services/shared.service";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { BasketService } from "../../services/basket.service";

@Component({
  selector: "head-bar",
  templateUrl: "./head-bar.component.html",
  styleUrls: ["./head-bar.component.css"]
})
export class HeadBarComponent {
  mainIcon = faSeedling;
  buyIcon = faShoppingCart;
  public _serviceLogin: LoginService;
  public _serviceBasket: BasketService;

  constructor(public _sharedService: SharedService, serviceBasket: BasketService, serviceLogin: LoginService, public router: Router) {
    this._serviceLogin = serviceLogin;
    this._serviceBasket = serviceBasket;
  }

  ngOnInit() {
    this._serviceLogin.logined().subscribe(b => {
      if (b == true) {
        this._sharedService._isAuthenticated = true;
      }
    })

    this._serviceBasket.getAll().subscribe(res => {
      if (res == undefined || res == null || res.length == 0) {
        this._sharedService._isBasketAvailable = false;
        return;
      }
      this._sharedService._isBasketAvailable = true;
    });
  }

  logout() {
    this._serviceLogin.logout().subscribe(b => {
      this._sharedService._isAuthenticated = false;
      this.router.navigateByUrl("");
    })
  }

  sideBar() {
    this._sharedService._isSideBarHidden = !this._sharedService._isSideBarHidden;
  }

  openBasketModal() {
    this._sharedService._isBasketModalOpened = true;
  }
}