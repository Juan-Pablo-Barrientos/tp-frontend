export interface RequestResponse<T>{
    status: any;
    data : T;
    error : boolean;
}
