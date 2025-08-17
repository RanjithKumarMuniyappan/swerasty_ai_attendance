const { VALIDATION_ERROR, UNAUTHORIZED_ERROR, FORBIDDENT, NOT_FOUND, SERVER_ERROR } = require("../constants");

const errorHandler = (error, request, response, next) =>{

    const statusCode = response.statusCode || 500;

    console.log("StatussCode : ", statusCode);
    

    switch (statusCode) {
        case VALIDATION_ERROR:
            response.json({
                title:"Validation Error",
                message:error.message,
                stackTrace:error.stackTrace
            })
            break;
    

        case UNAUTHORIZED_ERROR:
            response.json({
                title:"UnAuthorized Error",
                message:error.message,
                stackTrace:error.stackTrace
            })
            break;
        case FORBIDDENT :
            response.json({
                title:"Forbidden error",
                message:error.message,
                stackTrace: error.stackTrace
            })
            break;
        case NOT_FOUND:
            response.json({
                title:"Not Found error",
                message:error.message,
                stackTrace: error.stackTrace
            })
            break;
        case SERVER_ERROR:
            response.json({
                title:"Server Error",
                message:error.message,
                stackTrace: error.stackTrace
            })
        default:
            console.log("No Error all fine");
            break;
    }
}

module.exports = errorHandler;