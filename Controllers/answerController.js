import Answers from "../Models/Answers.js";
import Questions from "../Models/Questions.js";
import Users from "../Models/Users.js";

export async function CreateAnswers(req, res){
  try {
    const { userPublicKey, questionId, answerText, tags } = req?.body

    //// Checking for invalid inputs ////
    if (!userPublicKey || !questionId || !answerText || !Array.isArray(tags) || !tags.length) {
        return res.status(400).json({ message: 'Missing required fields or invalid tags' });
    }

    const user = await Users.findOne({userPublicKey})
    
    
    const newAnswer = await Answers.create({
        userId:user._id,
        questionId,
        answerText,
        tags,
      });
    // Update the `answersId` array in the `Questions` model
    const updateQuestion = await Questions.updateOne(
      { _id: questionId },
      { $push: { answersId: newAnswer._id } }
    )

    /////  sends an email to the user that asks the Question ///
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
          rejectUnauthorized: false
        }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: useremail,
      subject: 'New Answer Posted',
      html: `
        <p>Hello ${user.username},</p>
        <p>A new answer has been posted for your question. You can view it <a href="http://localhost:3001/main-dashboard/${questionId}">here</a>.</p>
        <p>Regards,</p>
        <p>Your Website Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
     console.log("this is the update question ", updateQuestion)
    res.status(201).json({ message: 'Answer created successfully', answer: newAnswer });
  } catch (error) {
    console.log("this is the error", error)
    res.status(500).json({ message: 'Error creating answer: ' + error.message });
  }
}

export async function GetAllAnswers(req, res){
  try {
    
    const allAnswers = await Answers.find({})
    const answerWithDetails = await Promise.all(
      allAnswers.map(async(answer) => {
           const user = await Users.findOne({_id: answer.userId})
           const question = await Questions.findOne({_id: answer.questionId})

           return {
            answer,
            question,
            user,
           }
      })
    )

    res.status(200).json({message: "This is all the answers", answers: answerWithDetails})

  } catch (error) {
    console.log("this is the error", error)
    res.status(500).json({ message: 'Error getting answers: ' + error.message });
  }
}

export async function UpdateAnswers(req, res){
  try {
     const { answersId, useremail, answerText, tags} = req?.body

     const user = await Users.findOne({useremail})

        const updatedAnswer = await Answers.findOneAndUpdate(
          { _id: answersId, userId: user._id },
          { answerText, tags },
          { new: true }
        );

        if (!updatedAnswer) {
          return res.status(404).json({ message: 'Answer not found or user not authorized to update' });
        }

        res.status(202).json({message: "Answer updated completely", answer: updatedAnswer})
  } catch (error) {
    console.log("this is the error", error)
    res.status(500).json({ message: 'Error updating answer: ' + error.message });
 
  }
}

export async function DeleteAnswer(req, res){
  try {
    const { answerId } = req?.useremail
    if(!answerId){
      return res.status(404).json({message: "answer id not found"})
    }
    const deletedAnswer = await Answers.findByIdAndDelete({_id: answerId}) 
    res.status(203).json({message: "Answer deleted successfully", deletedAnswer})
  } catch (error) {
    console.log("this is the error", error)
    res.status(500).json({ message: 'Error deleting answer: ' + error.message });
  }
}