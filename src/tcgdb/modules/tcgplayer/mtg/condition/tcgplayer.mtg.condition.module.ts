import { Module } from '@nestjs/common';
import { TCGPlayerMTGConditionService } from './tcgplayer.mtg.condition.service';
import { TCGPlayerMTGCondition } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/condition/tcgplayer.mtg.condition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGConditionController } from './tcgplayer.mtg.condition.controller';
import { TCGPlayerAPIConditionModule } from 'src/tcgdb/modules/tcgplayer/api/condition/tcgplayer.api.condition.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGCondition]),
        HttpModule,
        TCGPlayerAPIConditionModule,
    ], 
    controllers: [TCGPlayerMTGConditionController],
    providers: [TCGPlayerMTGConditionService],
    exports: [TCGPlayerMTGConditionService],
})

export class TCGPlayerMTGConditionModule {}