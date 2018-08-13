import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Users = new Schema({
    name:{
        type:String
    },
    age:{
        type:Number,
 
    },
    password:{
        type:String,
        select:false
    }
});
Users.set('toJSON',{
    virtuals:true,
    transform:(doc,ret,options)=>{
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    }
})
export default mongoose.model('Users',Users);