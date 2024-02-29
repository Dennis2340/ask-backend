import express from "express"
import { CreateAnswers, DeleteAnswer, GetAllAnswers, UpdateAnswers } from "../Controllers/answerController.js"

const answerrouter = express.Router()

answerrouter.post("/create", CreateAnswers)
answerrouter.get("/getAll", GetAllAnswers)
answerrouter.put("/update", UpdateAnswers)
answerrouter.delete("/delete/:answerId", DeleteAnswer)

export default answerrouter