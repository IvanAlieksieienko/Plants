import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from "../models/category.model";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private url = "";

    constructor(private http: HttpClient) {}

    public add(model: CategoryModel) : Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.url + "category/add", model);
    }

    public getAll() : Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.url + "category/all");
    }

    public getByID(id: Guid) : Observable<CategoryModel> {
        return this.http.get<CategoryModel>(this.url + "category/" + id);
    }

    public update(model: CategoryModel) : Observable<CategoryModel>{
        return this.http.put<CategoryModel>(this.url + "category/update", model)
    }

    public delete(id: Guid) {
        return this.http.delete(this.url + "category/" + id)
    }
}