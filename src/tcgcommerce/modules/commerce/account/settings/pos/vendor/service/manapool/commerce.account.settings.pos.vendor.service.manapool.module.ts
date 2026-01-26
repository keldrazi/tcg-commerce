import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from './commerce.account.settings.pos.vendor.service.manapool.service';
import { CommerceAccountSettingsPOSVendorServiceManaPoolController } from './commerce.account.settings.pos.vendor.service.manapool.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPool } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.entity';
import { POSVendorServiceManaPoolAdminModule } from 'src/tcgcommerce/modules/pos/vendor/service/manapool/admin/pos.vendor.service.manapool.admin.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceManaPool]),
        POSVendorServiceManaPoolAdminModule
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceManaPoolController],
    providers: [CommerceAccountSettingsPOSVendorServiceManaPoolService],
    exports: [CommerceAccountSettingsPOSVendorServiceManaPoolService]
})
export class CommerceAccountSettingsPOSVendorServiceManaPoolModule {}
