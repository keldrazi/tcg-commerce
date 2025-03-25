import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceLocationService } from './application.module.service';
import { CommerceLocationController } from './application.module.controller';
import { CommerceLocation } from 'src/typeorm/entities/modules/commerce/location/commerce.location.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceLocation])
    ],
    controllers: [CommerceLocationController],
    providers: [CommerceLocationService],
    exports: [CommerceLocationService]
})
export class CommerceLocationModule {}
