import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from './commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerController } from './commerce.account.settings.pos.vendor.service.tcgplayer.controller';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayer } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceTCGPlayer]),
        ConfigModule,
        HttpModule
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceTCGPlayerController],
    providers: [CommerceAccountSettingsPOSVendorServiceTCGPlayerService],
    exports: [CommerceAccountSettingsPOSVendorServiceTCGPlayerService]
})
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerModule {}
