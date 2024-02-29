
import { transfer,  } from "@solana/spl-token"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export async function TransferToken(connection, fromWallet, frmTokenAccount, receiversTokenAccount, amount) {

  const transactionSignature = await transfer(
    connection,
    fromWallet,
    frmTokenAccount,
    receiversTokenAccount.address,
    fromWallet,
    amount * LAMPORTS_PER_SOL
  )

  return transactionSignature
}