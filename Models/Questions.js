import mongoose from "mongoose";

const Schema = mongoose.Schema

const questionSchema = new Schema({
    userId:{ 
        type: Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    questionTitle: {
        type: String,
        required: true
    },
    questionBody: {
        type: String,
        required: true
    },
    answersId: [{
        type: Schema.Types.ObjectId, 
        ref: 'Answers', 
    }],
    tags: {
        type: [String],
        required: true
    },
},
{
    timestamps: true
}
)

const Questions = mongoose.model("Questions", questionSchema)

export default Questions