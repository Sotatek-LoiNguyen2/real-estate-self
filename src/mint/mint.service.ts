import { Injectable } from '@nestjs/common';
import * as anchor from '@project-serum/anchor';
import { AnchorProvider, web3 } from '@project-serum/anchor';
const { SystemProgram } = web3;
import * as bs58 from 'bs58'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MintService {

    constructor(private readonly configService: ConfigService){}

    mint(base64_serialized_tx: string){
        const secretkey = this.configService.get<string>('SECRET_KEY')
        const adminKeyPair = anchor.web3.Keypair.fromSecretKey(
            Uint8Array.from(
               bs58.decode(secretkey)
            )
        )

        const admin = new anchor.Wallet(adminKeyPair)
        const serialized_tx = Buffer.from(base64_serialized_tx,"base64")
        const mint_tx = anchor.web3.Transaction.from(serialized_tx);
        
        mint_tx.partialSign(admin.payer)

        const serialized_tx_2 = mint_tx.serialize({
            requireAllSignatures: false
        });

        return serialized_tx_2.toString("base64")
    }
}