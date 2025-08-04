export class RuntimeError extends Error{
    public caused:Error|undefined;
    public message:string;
    constructor(message:string,caused:Error|undefined = undefined){
        super(message);
        this.caused = caused;
        this.name = this.constructor.name;
    }
}

export class WebRequestWError extends RuntimeError{}

export class InvalidAuthorizeStateError extends RuntimeError{}

export class CommentError extends RuntimeError{}
