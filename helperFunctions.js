import Answers from "./Models/Answers.js";
import Users from "./Models/Users.js";
import VoteCount from "./Models/VoteCount.js";

export async function AddVote(req, res){
    try {
        const { useremail, answerId } = req?.body
        const user = await Users.findOne({useremail})
        if(!user){
            return res.status(404).json({message: "user not found please put a valid email"})
        }
        const existingVote = await VoteCount.findOne({ userId:user?._id, answerId });
        if(existingVote){

            await VoteCount.findByIdAndDelete(existingVote._id);
          
            // Decrement the like count in the BlogPost model
            await Answers.findByIdAndUpdate(answerId, { $inc: { voteCount: -1 } });
            return res.status(201).json({message: "unliked"})
        }else{
            // If the like doesn't exist, create a new like
            await VoteCount.create({
                userId: user?._id,
                answerId
            });
            
             await Answers.findByIdAndUpdate(answerId, { $inc: { voteCount: 1 } });
            }

            return res.status(201).json({message: "liked"})
        
    } catch (error) {
        console.log("this is the error", error)
        res.status(500).json({ message: 'Error voting error: ' + error.message });
     
    }
}


