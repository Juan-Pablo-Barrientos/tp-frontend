import { BaseClass, IBaseClass } from "./baseClass";
import { UserVotes } from "./user_votes";

export interface IUser extends IBaseClass {
    name: string,
    surname: string,
    username : string,
    password : string,
    role: string,
    phoneNumber: number,
    subscribedUntil: Date,
    Bio: string,
    email: string,
    jwt: string,
    UserVotes: UserVotes[]
}

export class User extends BaseClass implements IUser {
    name: string = "";
    surname: string = "";
    username : string = "";
    password : string = "";
    role: string = "";
    phoneNumber: number = 0;
    subscribedUntil: Date = new Date();
    Bio: string = "";
    email: string = "";
    jwt: string = "";
    UserVotes: UserVotes[] = new Array();
}