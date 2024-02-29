import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { mintTo } from "@solana/spl-token"

export async function MintMoreToken(connection, fromWallet, mint, frmTokenAccount) {
  // Minting 1 new token to the "fromTokenAccount" account we just returned/created
  const mintDetails = await mintTo(
    connection,
    fromWallet,
    mint,
    frmTokenAccount,
    fromWallet.publicKey,
    1000000000 // it's 1 token, but in lamports
  );

  return mintDetails
}