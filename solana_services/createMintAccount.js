import { createMint } from "@solana/spl-token"

export async function CreateMintToken(connection, fromWallet) {

  // Create new token mint account
  const mint = await createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9,
  );

  console.log("This is the mint: ", mint)

  return mint

}