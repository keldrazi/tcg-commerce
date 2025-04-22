import { Module } from '@nestjs/common';
import { TCGPlayerMTGLanguageService } from './tcgplayer.mtg.language.service';
import { TCGPlayerMTGLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/language/tcgplayer.mtg.language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGLanguageController } from './tcgplayer.mtg.language.controller';
import { TCGPlayerAPILanguageModule } from 'src/tcgdb/modules/tcgplayer/api/language/tcgplayer.api.language.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGLanguage]),
        HttpModule,
        TCGPlayerAPILanguageModule,
    ], 
    controllers: [TCGPlayerMTGLanguageController],
    providers: [TCGPlayerMTGLanguageService],
    exports: [TCGPlayerMTGLanguageService],
})

export class TCGPlayerMTGLanguageModule {}