import userModel from "../models/userModel.js"

export const registerController = async (req,res,next)=>{
    
        const {name,email,password} = req.body
        //validate
        if(!name){
            next("Please provide name")
        }
        if(!email){
            next("Please provide email")
        }
        if(!password){
            next("Please provide password and greater than 6 character")
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            next("Email already registered Please login")
        } 
        const user = await userModel.create({name , email , password})
        // token creation
        const token = user.createJWT()
        res.status(201).send({
            message: "User successfully registered",
            success: true,
            user:{
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location
            },
            token
        })
}

export const loginController = async(req,res,next) => {
    const {email,password} = req.body
    //validation
    if(!email || !password){
        next("Please provide all fields")
    }   
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next("Invalid Username or password")
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next("Invalid username or password")
        return
    }
    user.password = undefined
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token
    })
}