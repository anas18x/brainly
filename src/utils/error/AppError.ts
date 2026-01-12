
class AppError extends Error{
    statusCode: number;
    constructor(message : string, statusCode : number){
        super(message)    // calls the parent Error construtor class so, error.class works
        this.statusCode = statusCode
    }
}

export default AppError