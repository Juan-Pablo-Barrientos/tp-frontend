import { BaseClass, IBaseClass } from "./baseClass";
import { City } from "./City";
import { Poll } from "./poll";

interface IProvince extends IBaseClass {
    name: string;
    destroyTime: Date;
    Cities: City[];
    Polls: Poll[];
}

export class Province extends BaseClass implements IProvince {
    name: string = "";
    destroyTime: Date = new Date();
    Cities: City[] = new Array();
    Polls: Poll[] = new Array();
}