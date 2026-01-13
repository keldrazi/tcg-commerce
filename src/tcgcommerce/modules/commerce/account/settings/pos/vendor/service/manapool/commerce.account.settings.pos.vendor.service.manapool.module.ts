import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from './commerce.account.settings.pos.vendor.service.manapool.service';
import { CommerceAccountSettingsPOSVendorServiceManaPoolController } from './commerce.account.settings.pos.vendor.service.manapool.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPool } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.entity';
import { POSVendorServiceManaPoolAPIRestV1Module } from 'src/tcgcommerce/modules/pos/vendor/service/manapool/api/rest/v1/pos.vendor.service.manapool.api.rest.v1.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceManaPool]),
        POSVendorServiceManaPoolAPIRestV1Module,
        ErrorMessageModule
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceManaPoolController],
    providers: [CommerceAccountSettingsPOSVendorServiceManaPoolService],
    exports: [CommerceAccountSettingsPOSVendorServiceManaPoolService]
})
export class CommerceAccountSettingsPOSVendorServiceManaPoolModule {}
