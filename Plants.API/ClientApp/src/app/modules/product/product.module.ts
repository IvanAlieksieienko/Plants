import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductAddComponent } from "src/app/components/product-add/product-add.component";
import { ProductRouterModule } from "./product-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductRouterModule,
        FontAwesomeModule,
        NgbModule
    ],
    declarations: [
        ProductAddComponent
    ]
})
export class ProductModule {}