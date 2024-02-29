import express from "express"
import { CreateUsers, GetAllUsers } from "../Controllers/userController.js"

const userrouter = express.Router()

userrouter.post("/create", CreateUsers)
userrouter.get("/getAll", GetAllUsers)

export default userrouter