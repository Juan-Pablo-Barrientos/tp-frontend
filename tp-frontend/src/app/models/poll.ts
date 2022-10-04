import { BaseClass, IBaseClass } from "./baseClass";
import { Category } from "./category";
import { Province } from "./province";
import { UserVotes } from "./user_votes";
import {PollValue} from "./poll_value"

interface IPoll extends IBaseClass {
    description: string;
    polls: Poll[];
    categoryId:string;
    category: Category;
    province: Province;
    userVotes: UserVotes[];
    pollDate:string;
    pollValueArray:any[];
    poll_values:PollValue[];
    totalVotes:number;
}

export class Poll extends BaseClass implements IPoll {
    description: string = "";
    categoryId:string="";
    polls: Poll[] = new Array();
    category: Category = new Category();
    province: Province = new Province();
    userVotes: UserVotes[] = new Array();
    pollDate:string="";
    pollValueArray:any[]=new Array();
    poll_values:PollValue[]= new Array();
    totalVotes:number=0;
}
