import { Guid } from "guid-typescript";

export class ProductModel {
    public ID: Guid;
    public CategoryID: Guid;
    public IsAvailable: boolean;
    public Name: string;
    public Description: string;
    public ImagePath: string;
    public Price: number;
}