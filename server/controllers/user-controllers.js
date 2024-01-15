import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const getAllUsers=async(req,res)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({users})
}

export const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User already exist login instead"})
    }
    const hashedPassword=bcrypt.hashSync(password);
    const user=new User({name,email,password:hashedPassword})
    try{
        await user.save();
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"No user found Singup Instead"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"Password Incorrect"})
    }
    return res.status(200).json({message:"Login Successfull",user:existingUser})
}

export const getById=async(req,res)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"No user found"})
    }
    return res.status(200).json({user})
}

export const updateProfile=async(req,res)=>{
    const {name,email,password}=req.body;
    const userId=req.params.id;
    const passwordHash=bcrypt.hashSync(password);
    let user;
    try{
        user=await User.findByIdAndUpdate(userId,{
            name,email,password:passwordHash})
    }catch(err){
        console.log(err);
    }
    if(!user){
        res.status(500).json({message:'Unable to Update the user details'})
    }
    return res.status(200).json({user});
}