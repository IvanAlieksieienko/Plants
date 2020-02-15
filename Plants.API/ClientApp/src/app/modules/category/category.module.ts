import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CategoryGetAllComponent } from "src/app/components/category-get-all/category-get-all.component";
import { CategoryAddComponent } from "src/app/components/category-add/category-add.component";
import { CategoryRouterModule } from "./category-routing.module";

@NgModule({ 
    imports: [
        CommonModule,
        CategoryRouterModule,
        
        FormsModule
    ],
    declarations: [
        CategoryGetAllComponent,
        CategoryAddComponent
    ]
})
export class CategoryModule {}