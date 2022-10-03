import { BaseClass, IBaseClass } from "./baseClass";
import { Poll } from "./poll";
import { UserVotes } from "./user_votes";

interface IPollValue extends IBaseClass {
    description: string;
    Poll: Poll;
    UserVotes: UserVotes[];
    votesByUsers:number;
}

export class PollValue extends BaseClass implements IPollValue {
    description: string = "";
    Poll: Poll = new Poll();
    UserVotes: UserVotes[] = new Array();
    votesByUsers:number=0;
}
