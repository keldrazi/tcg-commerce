import { Module } from '@nestjs/common';
import { TCGPlayerMTGSetService } from './tcgplayer.mtg.set.service';
import { TCGPlayerMTGSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGSetController } from './tcgplayer.mtg.set.controller';
import { TCGPlayerAPISetModule } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGSet]),
        HttpModule,
        TCGPlayerAPISetModule,
    ], 
    controllers: [TCGPlayerMTGSetController],
    providers: [TCGPlayerMTGSetService],
    exports: [TCGPlayerMTGSetService],
})

export class TCGPlayerMTGSetModule {}