import UserModel from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController{
    static  userRegistration=async(req,res)=>{
        const {name,email,password,password_confirmation,tc}=req.body
        const user=await UserModel.findOne({email:email})

        if(user){
            res.send({"status":"failed","message":"Email already exists"})
        }else{
            if(name &&email && password && password_confirmation && tc){
                if(password==password_confirmation){

                    const salt=await bcrypt.genSalt(10)
                    const hashPassword=await bcrypt.hash(password,salt)
                    const doc=new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    await doc.save()
                    res.send({"status":"success","message":"Data saved successfully"})

                }else{
                     res.send({"status":"failed","message":"Confirmed password doesn't match."})
                }
            }else{
                 res.send({"status":"failed","message":"All fields are required."})
            }
        }
    }



    static userLogin=async(req,res)=>{
        try {
            const {email,password}=req.body
            if(email && password){
                const user=await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch=await bcrypt.compare(password,user.password)
                    if(user.email===email && isMatch){
                        res.send({"status":"success","message":"Login successfull"})

                    }else{
                        res.send({"status":"failed","message":"Either email or password is invalid."})

                    }
                }else{
                    res.send({"status":"failed","message":"User not found"})

                }
            }else{
                res.send({"status":"failed","message":"All fields are required."})
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

export default UserController                       