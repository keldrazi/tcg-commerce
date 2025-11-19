import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistModuleService } from './buylist.module.service';
import { BuylistModuleController } from './buylist.module.controller';
import { BuylistModule } from 'src/typeorm/entities/tcgcommerce/modules/buylist/module/buylist.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistModule]),
        ErrorMessageModule
    ],
    controllers: [BuylistModuleController],
    providers: [BuylistModuleService],
    exports: [BuylistModuleService]
})
export class BuylistModuleModule {}
