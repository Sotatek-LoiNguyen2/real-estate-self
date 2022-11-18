import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TxDto } from './mint.dto';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
    constructor(private readonly mintService: MintService,
        private readonly configService: ConfigService){}

    @Get()
    mint(@Body() tx: TxDto){
        return this.mintService.mint(tx.base64_serialized_tx,this.configService.get<string>('SECRET_KEY'));
    }
}
