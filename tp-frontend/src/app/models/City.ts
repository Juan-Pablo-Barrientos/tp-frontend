import { BaseClass, IBaseClass } from "./baseClass";
import { Province } from "./province";

interface ICity extends IBaseClass {
    name: string;
    provinceId: number;
    Province : Province;
}

export class City extends BaseClass implements ICity {
    name: string = "";
    provinceId: number = 0;
    Province : Province = new Province();
}