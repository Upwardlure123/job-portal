// error middleware || NEXT function
const errorMiddleware = (err,req,res,next) => {
    console.log(err);
    const defaultErrors = {
        statusCode: 400,
        message: err
    }
    //missing field error
    if(err.name === "ValidationError"){
        defaultErrors.statusCode = 400,
        defaultErrors.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(",")
    }

    // duplicate error
    if(err.code && err.code === 11000){
        defaultErrors.code = 400
        defaultErrors.message = `${Object.keys
            (err.keyValue
            )} Field value has to be unique`
    }
    res.status(defaultErrors.statusCode).json({message: defaultErrors.message})
};


export default errorMiddleware