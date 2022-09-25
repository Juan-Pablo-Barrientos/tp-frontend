import { BaseClass, IBaseClass } from "./baseClass";
import { Category } from "./category";
import { Province } from "./province";
import { UserVotes } from "./user_votes";

interface IPoll extends IBaseClass {
    description: string;
    Polls: Poll[];
    Category: Category;
    Province: Province;
    UserVotes: UserVotes[];
}

export class Poll extends BaseClass implements IPoll {
    description: string = "";
    Polls: Poll[] = new Array();
    Category: Category = new Category();
    Province: Province = new Province();
    UserVotes: UserVotes[] = new Array();
}