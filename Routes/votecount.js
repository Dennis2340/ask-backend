import express from "express"
import { AddVote } from "../helperFunctions.js"


const voterouter = express.Router()

voterouter.post("/add", AddVote)


export default voterouter