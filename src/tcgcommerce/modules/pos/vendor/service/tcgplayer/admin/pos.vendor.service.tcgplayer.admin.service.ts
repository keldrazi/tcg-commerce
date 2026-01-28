import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';

@Injectable()
export class POSVendorServiceTCGPlayerAdminService {

    constructor(
        private configService: ConfigService,
        private inventoryProductCardService: InventoryProductCardService,
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
        private awsS3Service: AwsS3Service,
    ) { }

    async createTCGPlayerInventoryAndPricesCSV(commerceAccountId: string): Promise<string> {
        //TO-DO: Implement method to generate TCGPlayer inventory and prices CSV
        return 'CSV generation not yet implemented.';
    }

    async processTCGPlayerInventoryAndPricesCSV(commerceAccountId: string, tcgPlayerCSVFile: Express.Multer.File) {
        //TO-DO: Implement method to process TCGPlayer inventory and prices CSV
        return;
    }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
    }
        
}