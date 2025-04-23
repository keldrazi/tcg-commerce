import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGConditionService } from './tcgdb.mtg.condition.service';
import { TCGdbMTGConditionController } from "./tcgdb.mtg.condition.controller";
import { TCGPlayerMTGConditionModule } from 'src/tcgdb/modules/tcgplayer/mtg/condition/tcgplayer.mtg.condition.module';
import { TCGdbMTGCondition } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/condition/tcgdb.mtg.condition.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGCondition]),
        TCGPlayerMTGConditionModule,
    ], 
    controllers: [TCGdbMTGConditionController],
    providers: [TCGdbMTGConditionService],
    exports: [TCGdbMTGConditionService],
})

export class TCGdbMTGConditionModule {}