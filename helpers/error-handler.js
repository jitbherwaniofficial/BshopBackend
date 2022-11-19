function errorHandler(err,req,res,next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({message:"The user is not authorized"})
    } //IF I ASK FOR AN API WITHOUT ANY TOKEN IT WILL GIVE ME THIS ERROR//
    //JWT AUTHENTICATION ERROR//
    if(err.name === "ValidationError"){
        res.status(401).json({message:err})
    } //IF I UPLOAD A PDF/IMAGE IN THE AUTH SERVER IT WILL SHOW THIS ERROR// //VALIDATION ERROR//
     return res.status(500).json({err}) //THIS IS FOR GENERAL ERROR// //DEFAULT TO 500 SERVER ERROR//
}

module.exports = errorHandler;