import mongoose from "mongoose";
const Schema = mongoose.Schema;

const voteCountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  answerId: { type: Schema.Types.ObjectId, ref: 'Answers' },
  
},
{
  timestamps:true
}
);

const VoteCount = mongoose.model('VoteCount', voteCountSchema);

export default VoteCount;