import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProcessCardService } from './import.process.card.service';
import { ImportServiceCardPhyzbatchModule } from 'src/tcgcommerce/modules/import/service/card/phyzbatch/import.service.card.phyzbatch.module';
import { ImportServiceCardRocaModule } from 'src/tcgcommerce/modules/import/service/card/roca/import.service.card.roca.module';
import { ImportServiceCardTCGPlayerModule } from 'src/tcgcommerce/modules/import/service/card/tcgplayer/import.service.card.tcgplayer.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';
import { ImportProductCardModule } from 'src/tcgcommerce/modules/import/product/card/import.product.card.module';

@Module({
    imports: [
        ImportServiceCardPhyzbatchModule,
        ImportServiceCardRocaModule,
        ImportServiceCardTCGPlayerModule,
        ImportProductCardModule,
        TCGdbMTGCardModule,
    ],
    providers: [ImportProcessCardService],
    exports: [ImportProcessCardService]
})
export class ImportProcessCardModule {}
