import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminModel } from "../models/login.model";

@Injectable({ providedIn: 'root' })
export class LoginService {
    private url = "";

    constructor(private http: HttpClient) {}

    public login(model: AdminModel) {
        return this.http.post(this.url + "/login", model);
    }

    public logout() {
        return this.http.get(this.url + "login/logout");
    }

    public logined() {
        return this.http.get(this.url + "login/logined");
    }
}