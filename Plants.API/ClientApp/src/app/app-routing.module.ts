import { Routes, RouterModule, Router } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { SharedService } from "./services/shared.service";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', loadChildren: "./modules/login/login.module#LoginModule"},
    {path: 'category', loadChildren: "./modules/category/category.module#CategoryModule"},
    {path: 'product', loadChildren: "./modules/product/product.module#ProductModule"},
    {path: '**', component: HomeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [SharedService]
})
export class AppRoutingModule { }