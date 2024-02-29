
import { createAccount } from "@solana/spl-token";

export async function CreateTokenAccount(connection, fromWallet, mint){
  const tokenAccount = await createAccount(
    connection,
    fromWallet,
    mint,
    fromWallet.publicKey,
  );
  console.log("this is the token account: ", tokenAccount)
  return tokenAccount
}