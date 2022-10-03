import { Poll } from "./poll";
import { PollValue } from "./poll_value";
import { User } from "./user";

interface IUserVotes {
    User: User;
    Poll: Poll;
    PollValue: PollValue;
    pollValueId:number

}

export class UserVotes implements IUserVotes {
    User: User = new User();
    Poll: Poll = new Poll();
    PollValue: PollValue = new PollValue();
    pollValueId:number=0

}
