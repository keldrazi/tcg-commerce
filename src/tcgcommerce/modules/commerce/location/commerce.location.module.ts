import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceLocationService } from './commerce.location.service';
import { CommerceLocationController } from './commerce.location.controller';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceLocation]),
        ErrorMessageModule
    ],
    controllers: [CommerceLocationController],
    providers: [CommerceLocationService],
    exports: [CommerceLocationService]
})
export class CommerceLocationModule {}
