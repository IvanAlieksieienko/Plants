import { LoginComponent } from "src/app/components/login/login.component";
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '**', component: LoginComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRouterModule {}