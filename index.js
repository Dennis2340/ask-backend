import { config } from "dotenv"
import express from "express"
import { connectDB, corsOption  } from "./config.js"
import cors from "cors"
import answerrouter from "./Routes/answer.js"
import questionrouter from "./Routes/question.js"
import userrouter from "./Routes/user.js"
import voterouter from "./Routes/votecount.js"
import startTokenTransferScheduler from "./solana_services/solanaService.js"

const app = express()

/// connect to database
config()

const PORT = process.env.PORT || 3600

connectDB()

app.use(express.json())
app.use(cors(corsOption))

///// Start the scheduler to give out token /////
startTokenTransferScheduler()

/// answers route ///////
app.use("/answer", answerrouter)

app.use("/answer/vote", voterouter)

app.use("/question", questionrouter)

app.use("/user", userrouter)



app.listen(PORT,() => {
    console.log(`Server started at port ${PORT}`)
})
