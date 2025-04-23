import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGLanguageService } from './tcgdb.mtg.language.service';
import { TCGdbMTGLanguageController } from "./tcgdb.mtg.language.controller";
import { TCGPlayerMTGLanguageModule } from 'src/tcgdb/modules/tcgplayer/mtg/language/tcgplayer.mtg.language.module';
import { TCGdbMTGLanguage } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/language/tcgdb.mtg.language.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGLanguage]),
        TCGPlayerMTGLanguageModule,
    ], 
    controllers: [TCGdbMTGLanguageController],
    providers: [TCGdbMTGLanguageService],
    exports: [TCGdbMTGLanguageService],
})

export class TCGdbMTGLanguageModule {}