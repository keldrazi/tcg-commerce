import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1AdminService } from '../api/rest/v1/admin/pos.vendor.service.manapool.api.rest.v1.admin.service';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceManaPoolAdminService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
        private posVendorServiceManaPoolAPIRestV1AdminService: POSVendorServiceManaPoolAPIRestV1AdminService,
    ) { }


    async getManaPoolAccount(commerceAccountId: string): Promise<any> {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
        
        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolAccount(email, accessToken);
    }

    async updateManaPoolSellerInventoriesByTCGPlayerSku(commerceAccountId: string, inventoryProductCardDTOs: InventoryProductCardDTO[]): Promise<void> {

    }

    async updateManaPoolSellerInventoryByTCGPlayerSku(commerceAccountId: string, inventoryProductCardDTOs: InventoryProductCardDTO): Promise<void> {
        
    }

    async getManaPoolSellerOrders(commerceAccountId: string): Promise<any> {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolSellerOrders(email, accessToken);
    }

    async getManaPoolSellerOrderById(commerceAccountId: string, orderId: string): Promise<any> {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolSellerOrderById(email, accessToken, orderId);
    }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId: string): Promise<any> {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
    }
        
}