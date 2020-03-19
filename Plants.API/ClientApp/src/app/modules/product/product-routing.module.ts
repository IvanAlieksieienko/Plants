import { Routes, RouterModule } from "@angular/router";
import { ProductAddComponent } from "src/app/components/product-add/product-add.component";
import { NgModule } from "@angular/core";
import { ProductGetByIDComponent } from "src/app/components/product-get-by-id/product-get-by-id.component";
import { ProductUpdateComponent } from "src/app/components/product-update/product-update.component";

const routes: Routes = [
    { path: 'create/:id', component: ProductAddComponent },
    { path: 'get/:id', component: ProductGetByIDComponent},
    { path: 'update/:id', component: ProductUpdateComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRouterModule {}