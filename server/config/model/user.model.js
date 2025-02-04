import {model,Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false
    },
    number:{
        type:Number,
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER',
    },
    avatar:{
        public_id:{type:String,required:true},
        secure_url:{type:String,required:true}
    },
        
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified(this.password)){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods = {
    generateJWTToken : function(){
        return jwt.sign(
            {
                id:this._id , email:this.email , role:this.role 
            },
            'BPYG2uaGqbm2od3ZbYVPqHc/+WZ5X32OL8XP0hXEI58=',
            {
                expiresIn:'7d'
            }
        )
    },
    comparePassword :async function(simpleTextPassword){
        return await bcrypt.compare(simpleTextPassword,this.password)
    }
}

const User = model('User',userSchema)

export default User