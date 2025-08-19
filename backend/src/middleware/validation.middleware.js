let validation = (validationSchema)=>{
    return (req, res, next)=>{
        let result = validationSchema.validate(req.body);
        let error = result.error;
        if(error){
            res.status(400).json({
                success: false, 
                message: error.details[0].message
            });
        }
        else{
            next();
        }
    }
};

export default validation;