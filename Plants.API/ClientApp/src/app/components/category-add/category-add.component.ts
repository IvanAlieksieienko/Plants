import { Component } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";

@Component({
    selector: 'category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

    icon = faPaperclip;
    private model: CategoryModel = new CategoryModel();
    private _serviceCategory: CategoryService;
    private _isShowFullImage: boolean = false;
    private _fullImagePath: string = "";

    constructor(private serviceCategory: CategoryService, private router: Router) {
        this._serviceCategory = serviceCategory;
    }

    ngOnInit() { 
        this.model.imagePath = "Resources\\Images\\default-tree.png";
    }

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var fileToUpload = event.target.files[0];
            this._serviceCategory.uploadImage(fileToUpload).subscribe(response => {
                if (response != null && response.dbPath != "") {
                    console.log(response);
                    this.model.imagePath = "";
                    this.model.imagePath += response.dbPath;
                    console.log(this.model.imagePath);
                }
            });
        }
    }

    add() {
        if (this.model.name != "") {
            this._serviceCategory.add(this.model).subscribe(response => {
                this.router.navigate(['category/get', response.id ])
            });
            console.log(this.model.description);
        }
        else {
            alert("Введите имя!");
        }
    }

    showImage(path: string) {
        this._isShowFullImage = true;
        this._fullImagePath = path;
    }

    closeImageView() {
        this._isShowFullImage = false;
        this._fullImagePath = "";
    }
}