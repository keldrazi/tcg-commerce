import { Module } from '@nestjs/common';
import { TCGPlayerMTGCardService } from './tcgplayer.mtg.card.service';
import { TCGPlayerMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGCardController } from './tcgplayer.mtg.card.controller';
import { TCGPlayerAPICardModule } from 'src/tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.module';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.module';
import { TCGPlayerAPISkuModule } from 'src/tcgdb/modules/tcgplayer/api/sku/tcgplayer.api.sku.module';
import { TCGPlayerMTGSetModule } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGCard]),
        HttpModule,
        TCGPlayerMTGSetModule,
        TCGPlayerAPICardModule,
        TCGPlayerAPIUtilModule,
        TCGPlayerAPISkuModule,
    ], 
    controllers: [TCGPlayerMTGCardController],
    providers: [TCGPlayerMTGCardService],
    exports: [TCGPlayerMTGCardService],
})

export class TCGPlayerMTGCardModule {}