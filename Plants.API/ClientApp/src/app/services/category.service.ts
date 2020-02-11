import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from "../models/category.model";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private url = "";

    constructor(private http: HttpClient) {}

    public add(model: CategoryModel) {
        return this.http.post(this.url + "category/add", model);
    }

    public getAll() : Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.url + "category/all");
    }

    public getByID(id: Guid) {
        return this.http.get(this.url + "category/" + id);
    }

    public update(model: CategoryModel) {
        return this.http.put(this.url + "category/update", model)
    }

    public delete(id: Guid) {
        return this.http.delete(this.url + "category/" + id)
    }
}