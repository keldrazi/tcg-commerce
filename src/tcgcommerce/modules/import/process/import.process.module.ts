import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProcessService } from './import.process.service';
import { ImportServicePhyzbatchModule } from 'src/tcgcommerce/modules/import/service/card/phyzbatch/import.service.phyzbatch.module';
import { ImportServiceRocaModule } from 'src/tcgcommerce/modules/import/service/card/roca/import.service.roca.module';
import { ImportServiceTCGPlayerModule } from 'src/tcgcommerce/modules/import/service/card/tcgplayer/import.service.tcgplayer.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { ImportCardModule } from 'src/tcgcommerce/modules/import/sort/data/import.sort.data.module';

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
