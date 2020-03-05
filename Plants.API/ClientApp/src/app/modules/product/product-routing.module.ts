import { Routes, RouterModule } from "@angular/router";
import { ProductAddComponent } from "src/app/components/product-add/product-add.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'create/:id', component: ProductAddComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRouterModule {}