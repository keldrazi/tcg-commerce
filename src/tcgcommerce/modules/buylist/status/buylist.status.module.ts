import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistStatusService } from './buylist.status.service';
import { BuylistStatusController } from './buylist.status.controller';
import { BuylistStatus } from 'src/typeorm/entities/tcgcommerce/modules/buylist/status/buylist.status.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistStatus]),
        ErrorMessageModule
    ],
    controllers: [BuylistStatusController],
    providers: [BuylistStatusService],
    exports: [BuylistStatusService]
})
export class BuylistStatusModule {}
