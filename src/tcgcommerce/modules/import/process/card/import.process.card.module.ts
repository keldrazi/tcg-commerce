import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProcessService } from './import.process.card.service';
import { ImportServicePhyzbatchModule } from 'src/tcgcommerce/modules/import/service/card/phyzbatch/import.service.card.phyzbatch.module';
import { ImportServiceRocaModule } from 'src/tcgcommerce/modules/import/service/card/roca/import.service.card.roca.module';
import { ImportServiceTCGPlayerModule } from 'src/tcgcommerce/modules/import/service/card/tcgplayer/import.service.card.tcgplayer.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { ImportCardModule } from 'src/tcgcommerce/modules/import/sort/card/data/import.sort.card.data.module';

@Module({
    imports: [
        ImportServicePhyzbatchModule,
        ImportServiceRocaModule,
        ImportServiceTCGPlayerModule,
        ImportCardModule,
        TCGdbMTGCardModule,
    ],
    providers: [ImportProcessService],
    exports: [ImportProcessService]
})
export class ImportProcessModule {}
