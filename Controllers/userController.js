import Users from "../Models/Users.js";
import * as borsh from '@coral-xyz/borsh'

const userBorshInstructionSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.str('userPublicKey'),
    borsh.str('username'),
    borsh.str('useremail'),
])
export async function CreateUsers(req, res){
    try {
        
        const { userPublicKey, username, useremail} = req?.body

        const newUser = await Users.create({
            userPublicKey,
            username,
            useremail
        })

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.log("this is the error ", error)
        res.status(500).json({ message: 'Error creating users: ' + error.message });
    }
}

export async function GetAllUsers(req, res){
    try {
        const users = await Users.find({})
        if(!users){
            return res.status(404).json({message: "no user found"})
        }
        res.status(200).json({ message: 'Fetch Users successfully', users })
    } catch (error) {
        console.log("this is the error ", error)
        res.status(500).json({ message: 'Error getting user: ' + error.message });
    
    }
}