import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CategoryGetAllComponent } from "src/app/components/category-get-all/category-get-all.component";
import { CategoryAddComponent } from "src/app/components/category-add/category-add.component";
import { CategoryRouterModule } from "./category-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CategoryGetByIDComponent } from "src/app/components/category-get-by-id/category-get-by-id.component";

@NgModule({ 
    imports: [
        CommonModule,
        CategoryRouterModule,
        FontAwesomeModule,
        FormsModule
    ],
    declarations: [
        CategoryGetAllComponent,
        CategoryAddComponent,
        CategoryGetByIDComponent
    ]
})
export class CategoryModule {}