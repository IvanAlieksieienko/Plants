import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CategoryGetAllComponent } from "src/app/components/category-get-all/category-get-all.component";
import { CategoryAddComponent } from "src/app/components/category-add/category-add.component";
import { CategoryGetByIDComponent } from "src/app/components/category-get-by-id/category-get-by-id.component";
import { CategoryUpdateComponent } from "src/app/components/category-update/category-update.component";

const routes: Routes = [
    { path: '', component: CategoryGetAllComponent},
    { path: 'create', component: CategoryAddComponent},
    { path: 'get/:id', component: CategoryGetByIDComponent},
    { path: 'update/:id', component: CategoryUpdateComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRouterModule {}