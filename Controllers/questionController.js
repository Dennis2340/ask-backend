import Answers from "../Models/Answers.js";
import Questions from "../Models/Questions.js";
import Users from "../Models/Users.js";

export async function CreateQuestions(req, res){
    try {
        const { userPublicKey, questionTitle, questionBody,tags } = req?.body

         //// Checking for invalid inputs ////
    if (!userPublicKey || !Array.isArray(tags) || !tags.length) {
        return res.status(400).json({ message: 'Missing required fields or invalid tags' });
    }

    const user = await Users.findOne({ userPublicKey })
    if(!user){
        return res.status(404).json({message: "User not found, please pass the public"})
    }

    const newQuestion = await Questions.create({
        userId: user._id,
        questionTitle,
        questionBody,
        tags,
      });
    res.status(201).json({ message: 'Question created successfully', question: newQuestion });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating question: ' + error.message });
    }
}

export async function GetAllQuestions(req, res){
    try {
        // Fetch all questions from the database
        const allQuestions = await Questions.find({})

        const questionsWithDetails = await Promise.all(
            allQuestions.map(async(question) => {

                const user = await Users.find({_id: question.userId})
                const answers = await Answers.find({ _id: { $in: question.answersId}})

                return {
                    question,
                    user,
                    answers
                }
            })
        )

        res.status(200).json({ message: 'Fetch Questions successfully', questions: questionsWithDetails });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting questions: ' + error.message });
    }
}

export async function GetSingleQuestion(req, res){
    try {
        const { questionId } = req?.url
        const singleQuestion = await Questions.findOne({ questionId })

        const user = await Users.findOne({_id: singleQuestion.userId})
        const answers = await Answers.find({ _id: { $in: singleQuestion.answersId}})
            
        const questionWithDetails = {
            singleQuestion,
            user,
            answers
        }
        res.status(200).json({ message: 'Fetch Question successfully', questions: questionWithDetails});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting questions: ' + error.message });
    }
}

//////// I am not sure if this end point is needed //////////
export async function DeleteQuestion(req, res){
    try {
        const { questionId } = req?.url
        
        
    } catch (error) {
        
    }
}

