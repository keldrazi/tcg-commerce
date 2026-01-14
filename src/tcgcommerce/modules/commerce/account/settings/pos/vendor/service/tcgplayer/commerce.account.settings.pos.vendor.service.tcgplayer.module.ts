import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from './commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerController } from './commerce.account.settings.pos.vendor.service.tcgplayer.controller';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayer } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceTCGPlayer]),
        ErrorMessageModule
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceTCGPlayerController],
    providers: [CommerceAccountSettingsPOSVendorServiceTCGPlayerService],
    exports: [CommerceAccountSettingsPOSVendorServiceTCGPlayerService]
})
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerModule {}
