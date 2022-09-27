import { ResponseWithMessage } from "./responseWithMessage";

export interface ResponseExists<T> extends ResponseWithMessage<T>{
    exist : boolean;
}