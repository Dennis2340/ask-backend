import mongoose from "mongoose";

const Schema = mongoose.Schema
const answerSchema = new Schema({
    
    questionId: { type: Schema.Types.ObjectId, ref: 'Questions' },

    answerText: {
        type: String,
        required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },

    tags: {
        type: [String],
        required: true,
    },
    voteCount: {
        type: Number,
        default: 0
    },
},
{
    timestamps: true
}
)

const Answers = mongoose.model("Answers", answerSchema)

export default Answers
