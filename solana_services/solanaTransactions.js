import Users from "../Models/Users.js"
import Answers from "../Models/Answers.js"
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import web3, { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from "bs58"

export async function sendTokenTransaction(){
    try {

        ////// get the highest voted answer /////
        const highestVotedAnswer = await Answers.findOne({})
            .sort({ voteCount: -1 }) // Sort in descending order of voteCount
            .limit(1);
        const { userId } = highestVotedAnswer
        const user = await Users.findOne({_id: userId})   

         const { userPublicKey: recieversPublicKey} = user
            console.log("this is the highest voted answer: ", {highestVotedAnswer,user})

        
        // Connect to cluster
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");

        // Getting the wallet that owns the Token account /////
        const fromWallet = Keypair.fromSecretKey(
           bs58.decode(process.env.OUR_WALLET_PRIVATEKEY)
        );

         ///// receivers public key /////
        const toWallet = new PublicKey(String(recieversPublicKey))
         
        ///// the mint public key of the token account ////
        const mint = new PublicKey(String(OUR_MINT_PUBLICKEY))
        
        ///// The token
        const frmTokenAccount = new PublicKey("3cGFVyYhwVLRfdXd1Wz1coxETihrBnAsPGfTcN1Q6P2m")

        //// create an associated token account for the user if the user did not have one 
        const receiversTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            toWallet
        )

        ///// Transfer tokens to the user with the voted answer ///////
        const transactionHash = await TransferToken(connection, fromWallet, frmTokenAccount, receiversTokenAccount, highestVotedAnswer.voteCount)
     
        console.log("This is the transaction signature ", tsx)
    } catch (error) {
        console.log("this is the error ", error)
    }
}