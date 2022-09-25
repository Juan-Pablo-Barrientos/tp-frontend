import { BaseClass, IBaseClass } from "./baseClass";
import { Poll } from "./poll";

interface ICategory extends IBaseClass {
    name: string;
    Polls : Poll[];
}

export class Category extends BaseClass implements ICategory {
    name: string = "";
    Polls : Poll[] = new Array();
}