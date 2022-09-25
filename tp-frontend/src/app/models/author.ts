import { IBaseClass, BaseClass } from "./baseClass";
import { Post } from "./post";
import { IUser, User } from "./user";
import { UserVotes } from "./user_votes";

interface IAuthor extends IUser, IBaseClass {
    name: string,
    surname: string,
    role: string,
    phoneNumber: number,
    subscribedUntil: Date,
    Bio: string,
    email: string,
    jwt: string,
    Posts: Post[]
}

export class Author extends User implements IAuthor{
    Posts: Post[] = new Array();
}