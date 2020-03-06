import { Routes, RouterModule, Router } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { SharedService } from "./services/shared.service";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
    {path: 'category', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)},
    {path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)},
    {path: '**', component: HomeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [SharedService]
})
export class AppRoutingModule { }