import { Module } from "@nestjs/common";
import { TCGdbMTGPriceHistoryService } from './tcgdb.mtg.price.history.service';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';


@Module({
    imports: [
        TCGdbMTGCardModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPriceHistoryService],
    exports: [TCGdbMTGPriceHistoryService],
})

export class TCGdbMTGPriceHistoryModule {}