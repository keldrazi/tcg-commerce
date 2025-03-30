import { Module } from '@nestjs/common';
import { TCGPlayerMTGPriceService } from './tcgplayer.mtg.price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGPriceController } from './tcgplayer.mtg.price.controller';
import { TCGPlayerAPIPriceModule } from 'src/tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.module';
import { TCGPlayerMTGSetModule } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.module';
import { TCGPlayerMTGPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGPrice]),
        HttpModule,
        TCGPlayerMTGSetModule,
        TCGPlayerAPIPriceModule,
    ], 
    controllers: [TCGPlayerMTGPriceController],
    providers: [TCGPlayerMTGPriceService],
    exports: [TCGPlayerMTGPriceService],
})

export class TCGPlayerMTGPriceModule {}