import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UsersDetails = new Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    }
});
export default mongoose.model('UsersDetails',UsersDetails);