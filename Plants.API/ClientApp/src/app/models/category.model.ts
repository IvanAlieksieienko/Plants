import { Guid } from "guid-typescript";

export class CategoryModel {
    public ID: Guid;
    public Name: string;
    public Description: string;
    public ImagePath: string;
}