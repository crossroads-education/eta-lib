export class HelperHttp {
    public static Success : number = 200;
    public static Redirect : number = 302;
    /**
    Value is 400 per https://stackoverflow.com/a/20215807 and https://tools.ietf.org/html/rfc7231
    Do not use 422, especially now that there is an official solution.
    */
    public static InvalidParameters : number = 400;
    public static Unauthorized : number = 401;
    public static Forbidden : number = 403;
    public static NotFound : number = 404;
    public static InternalError : number = 500;
}
