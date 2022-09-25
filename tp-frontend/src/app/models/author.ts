import { IBaseClass } from "./baseClass";
import { Post } from "./post";
import { IUser, User } from "./user";

interface IAuthor extends IUser, IBaseClass {
    Posts: Post[]
}

export class Author extends User implements IAuthor {
    Posts: Post[] = new Array();
}