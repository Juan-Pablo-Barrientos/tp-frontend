import { RequestResponse } from "./requestResponse";

export interface ResponseWithMessage<T> extends RequestResponse<T>{
    msg : string;
}