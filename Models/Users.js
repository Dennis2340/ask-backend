import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    userPublicKey: {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    useremail: {
        type: String, 
        required: true
    },
},
{
    timestamps: true
}
)

const Users = mongoose.model("Users", userSchema)

export default Users