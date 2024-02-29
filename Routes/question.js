import express from "express"
import { CreateQuestions, GetAllQuestions, GetSingleQuestion } from "../Controllers/questionController.js"

const questionrouter = express.Router()

questionrouter.post("/create", CreateQuestions)
questionrouter.get("/getAll", GetAllQuestions)
questionrouter.get("/getSingle/:questionId", GetSingleQuestion)

export default questionrouter