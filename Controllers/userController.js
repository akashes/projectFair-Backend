//register logic
const {json}= require('express')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


//exporting register function as a property of the module
exports.register=async(req,res)=>{
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

exports.updateUserDetails=async(req,res)=>{
    
    const profile = req.file ? req.file.filename : undefined;
    
    console.log(profile);
    
    console.log('indise');
   try{
    const{github,link,username}=req.body
    console.log('reqbody is ',github,link);
console.log('inside updat user');
    const value = req.payload
    console.log('payload is ',value);

    const newUser = await users.findByIdAndUpdate({_id:value},{github,link,profile,username},{new:true})
    if(newUser){
        console.log('new user is ',newUser);
        res.status(200).json(newUser)
    }else{
        res.status(404).json('cant update user')
    }

   }catch(err){
    res.status(500).json(err.message)
   }
   
    
}

exports.getAUserDetail=async(req,res)=>{
   try{
    const userId = req.payload
    console.log('userid is ',userId);
    const user = await users.findById(userId)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(401).json('cant find user')
    }
   }catch(err){
    console.log(err);
    res.status(500).json('couldnt find user')
   }
}