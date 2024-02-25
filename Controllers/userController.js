//register logic
const {json}= require('express')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


//exporting register function as a property of the module
exports.register=async(req,res)=>{
    console.log("inside register function");
    const {username,email,password}=req.body
   try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        //email already existing in the db
        res.status(401).json("user already registered")
    }else{
        const newuser = await users({
            username,email,password,github:"",link:"",profile:""
        })
        await newuser.save()
        res.status(200).json("user Registration successfull")
        
    }
   }
   catch(err){
    console.log(err);
   }
}



exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user= await users.findOne({email,password})
        if(user){
            const token = jwt.sign({userId:user._id},"superKey2024")
            res.status(200).json({user,token})

        
        }
        else{
            res.status(401).json("invalid login")
        }
    }
    catch(error){
        res.status(500).json(`server error ${error.message}`)
        
    }
}

