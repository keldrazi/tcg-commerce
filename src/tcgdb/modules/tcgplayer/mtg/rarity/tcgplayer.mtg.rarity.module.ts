import { Module } from '@nestjs/common';
import { TCGPlayerMTGRarityService } from './tcgplayer.mtg.rarity.service';
import { TCGPlayerMTGRarity } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/rarity/tcgplayer.mtg.rarity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGRarityController } from './tcgplayer.mtg.rarity.controller';
import { TCGPlayerAPIRarityModule } from 'src/tcgdb/modules/tcgplayer/api/rarity/tcgplayer.api.rarity.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGRarity]),
        HttpModule,
        TCGPlayerAPIRarityModule,
    ], 
    controllers: [TCGPlayerMTGRarityController],
    providers: [TCGPlayerMTGRarityService],
    exports: [TCGPlayerMTGRarityService],
})

export class TCGPlayerMTGRarityModule {}