class CustomError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    // console.log(message)
    }
    // status;
    // errors;
    //
    // constructor(message, status = 400, errors) {
    //     super(message);
    //     this.status = status;
    //     this.errors = errors;
    // }
    // static UnauthorizedError() {
    //     return new CustomError('User not authorized', 401, )
    // }
    //
    // static BadRequest(message, errors=[]){
    //     return new CustomError(message, 400, errors)
    // }
}

module.exports = CustomError;