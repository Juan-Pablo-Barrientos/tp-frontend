import { BaseClass, IBaseClass } from "./baseClass";
import { UserVotes } from "./user_votes";

export interface IUser extends IBaseClass {
    name: string,
    surname: string,
    username : string,
    password : string,
    role: string,
    phoneNumber: number,
    subscribed: Boolean,
    bio: string,
    email: string,
    jwt: string,
    UserVotes: UserVotes[],
    path_img:string;
}

export class User extends BaseClass implements IUser {
    name: string = "";
    surname: string = "";
    username : string = "";
    password : string = "";
    role: string = "";
    phoneNumber: number = 0;
    subscribed: Boolean = false;
    bio: string = "";
    email: string = "";
    jwt: string = "";
    path_img:string="";
    UserVotes: UserVotes[] = new Array();
}
