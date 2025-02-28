import { BaseClass, IBaseClass } from "./baseClass";
import { Category } from "./category";
import { Province } from "./province";
import { User } from "./user";

interface IPost extends IBaseClass {
    title: string,
    body: string,
    requiresSubscription: boolean,
    path_img: string,
    clicks: number,
    postDate: Date,
    destroyTime: Date,
    categoryId: number,
    provinceId: number,
    userId: number,
    province: Province,
    category : Category,
    user : User,
}

export class Post extends BaseClass implements IPost {
    title: string = "";
    body: string = "";
    requiresSubscription: boolean = false;
    path_img: string = "";
    clicks: number = 0;
    postDate: Date = new Date();
    destroyTime: Date = new Date();
    categoryId: number = 0;
    provinceId: number = 0;
    userId: number = 0;
    province: Province = new Province();
    category: Category = new Category();
    user: User = new User();
}