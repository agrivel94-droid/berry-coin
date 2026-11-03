/** Solana Devnet Token-2022 transfer. Dynamically imports the official web3.js client.
 *  No custody: all transactions are reviewed/signed by the user's injected wallet. */
const TOKEN_2022 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
const ASSOCIATED_TOKEN_PROGRAM = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
export async function transferBERRY({rpcUrl,mint,owner,destination,amount,provider,sourceTokenAccount}){
  if(!provider||typeof provider.signAndSendTransaction!=='function')throw Error('Votre portefeuille ne permet pas la signature de transactions depuis ce navigateur. Ouvrez la page dans le navigateur intégré de Phantom.');
  const {Connection,PublicKey,Transaction,TransactionInstruction}=await import('https://esm.sh/@solana/web3.js@1.98.4?bundle');
  const connection=new Connection(rpcUrl,'confirmed');
  const tokenProgram=new PublicKey(TOKEN_2022),ataProgram=new PublicKey(ASSOCIATED_TOKEN_PROGRAM);
  const mintKey=new PublicKey(mint), ownerKey=new PublicKey(owner), destinationKey=new PublicKey(destination);
  if(!PublicKey.isOnCurve(destinationKey.toBytes()))throw Error('Le destinataire est une adresse de programme. Envoi désactivé pour ce prototype.');
  const ata = address => PublicKey.findProgramAddressSync([address.toBuffer(),tokenProgram.toBuffer(),mintKey.toBuffer()],ataProgram)[0];
  const destinationAta=ata(destinationKey);
  const sourceAta=sourceTokenAccount?new PublicKey(sourceTokenAccount):ata(ownerKey);
  const srcInfo=await connection.getAccountInfo(sourceAta,'confirmed');
  if(!srcInfo||!srcInfo.owner.equals(tokenProgram))throw Error('Compte BERRY source introuvable ou invalide');
  const destinationInfo=await connection.getAccountInfo(destinationAta,'confirmed');
  const tx=new Transaction();
  if(!destinationInfo){
    // Associated Token Account Program: CreateIdempotent = 1
    tx.add(new TransactionInstruction({programId:ataProgram,keys:[
      {pubkey:ownerKey,isSigner:true,isWritable:true},
      {pubkey:destinationAta,isSigner:false,isWritable:true},
      {pubkey:destinationKey,isSigner:false,isWritable:false},
      {pubkey:mintKey,isSigner:false,isWritable:false},
      {pubkey:new PublicKey('11111111111111111111111111111111'),isSigner:false,isWritable:false},
      {pubkey:tokenProgram,isSigner:false,isWritable:false}
    ],data:Uint8Array.from([1])}));
  } else if(!destinationInfo.owner.equals(tokenProgram)) throw Error('Le compte destinataire ne correspond pas au programme Token-2022');
  // Token-2022 TransferChecked: instruction discriminator 12; u64 little endian; decimals u8.
  const data=new Uint8Array(10);data[0]=12;let remaining=amount;for(let i=1;i<=8;i++){data[i]=Number(remaining&255n);remaining>>=8n}data[9]=6;
  tx.add(new TransactionInstruction({programId:tokenProgram,keys:[
    {pubkey:sourceAta,isSigner:false,isWritable:true},
    {pubkey:mintKey,isSigner:false,isWritable:false},
    {pubkey:destinationAta,isSigner:false,isWritable:true},
    {pubkey:ownerKey,isSigner:true,isWritable:false}
  ],data}));
  const {blockhash}=await connection.getLatestBlockhash('confirmed');tx.recentBlockhash=blockhash;tx.feePayer=ownerKey;
  const result=await provider.signAndSendTransaction(tx);
  const sig=result?.signature;
  if(!sig)throw Error('Aucune signature retournée par le portefeuille');
  if(typeof sig==='string')return sig;
  // Browser-compatible base58 encoder for signature bytes.
  const alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const bytes=Array.from(sig);let value=0n;for(const byte of bytes)value=(value<<8n)+BigInt(byte);let encoded='';while(value>0n){encoded=alphabet[Number(value%58n)]+encoded;value/=58n}for(const byte of bytes){if(byte!==0)break;encoded='1'+encoded}return encoded;
}
