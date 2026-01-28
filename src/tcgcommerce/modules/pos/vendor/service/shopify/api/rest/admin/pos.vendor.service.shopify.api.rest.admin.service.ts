import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import { ShopifyProduct, ShopifyProductUpdate, ShopifyProductMetafield, ShopifyProductVariant, ShopifyProductVariantObject, ShopifyProductVariants, ShopifyInventoryLevel, ShopifyInventoryLevels, ShopifyInventoryItems, ShopifyInventoryItem, ShopifyLocation, ShopifyLocations } from 'src/tcgcommerce/modules/pos/vendor/service/shopify/api/rest/admin/types/pos.vendor.service.shopify.api.rest.admin.types';


@Injectable()
export class POSVendorServiceShopifyAPIRestAdminService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private shopifyRestURLPrefix = this.configService.get('SHOPIFY_REST_URL_PREFIX') 
    private shopifyRestURL = this.configService.get('SHOPIFY_REST_URL')
    private shopifyAPIVersion = this.configService.get('SHOPIFY_API_VERSION');

    /*******************************************************************************/
    /* SHOP METHODS (USED FOR VERIFICATION)
    /******************************************************************************/
    async getShopifyShop(storeName:string, accessToken:string, productId: string): Promise<any> {

        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
    
        
        const shopifyShopURI = shopifyRestURI + 'shop.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyShopURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }
    
    /*******************************************************************************/
    /* PRODUCT METHODS
    /******************************************************************************/
    async getShopifyProductsByProductType(storeName: string, accessToken: string, productType: string): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyProductTypeURI = shopifyRestURI + 'products.json?product_type=' + productType;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductTypeURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async getShopifyProductByProductHandle(storeName: string, accessToken: string, productHandle: string): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyProductHandleURI = shopifyRestURI + 'products.json?handle=' + productHandle;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductHandleURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async createShopifyProduct(storeName: string, accessToken: string, shopifyProduct: ShopifyProduct): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyCreateProductURI = shopifyRestURI + 'products.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.post(shopifyCreateProductURI, shopifyProduct, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    async updateShopifyProduct(storeName: string, accessToken: string, shopifyProduct: ShopifyProductUpdate): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyCreateProductURI = shopifyRestURI + 'products/' + shopifyProduct.product.id + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.put(shopifyCreateProductURI, shopifyProduct, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    /*******************************************************************************/
    /* PRODUCT NETAFIELD METHODS
    /******************************************************************************/
    async getShopifyProductMetafieldsByProductId(storeName: string, accessToken: string, productId: string): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyMetafieldURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async getShopifyProductMetafieldsByMetafieldId(storeName: string, accessToken: string, productId: string, metafieldId: string): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields/' + metafieldId + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyMetafieldURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async createShopifyProductMetafield(storeName: string, accessToken: string, productId: string, shopifyProductMetafield: ShopifyProductMetafield): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyCreateProductMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.post(shopifyCreateProductMetafieldURI, shopifyProductMetafield, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    async updateShopifyProductMetafield(storeName: string, accessToken: string, productId: string, shopifyProductMetafield: any): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyUpdateProductMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields/' + shopifyProductMetafield.metafield.id + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.put(shopifyUpdateProductMetafieldURI, shopifyProductMetafield, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }
    
    /*******************************************************************************/
    /* PRODUCT VARIANT METHODS
    /******************************************************************************/
    async getShopifyProductVariantsByProductId(storeName:string, accessToken:string, productId:string): Promise<ShopifyProductVariants> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyProductVariantURI = shopifyRestURI + 'products/' + productId + '/variants.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductVariantURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);
       
        let shopifyProductVariant: ShopifyProductVariant[] = [];

        for(let i=0; i < data.variants.length; i++) {
            let shopifyProductVariantObject = new ShopifyProductVariant();
            shopifyProductVariantObject.id = data.variants[i].id;
            shopifyProductVariantObject.name = data.variants[i].name;
            shopifyProductVariantObject.price = data.variants[i].price;
            shopifyProductVariantObject.inventory_item_id = data.variants[i].inventory_item_id;
            shopifyProductVariantObject.inventory_quantity = data.variants[i].inventory_quantity;
            shopifyProductVariantObject.old_inventory_quantity = data.variants[i].old_inventory_quantity;

            shopifyProductVariant.push(shopifyProductVariantObject);

        }

        let shopifyProductVariants = new ShopifyProductVariants();
        shopifyProductVariants.variants = shopifyProductVariant;
        
        return shopifyProductVariants;
    }

    async updateShopifyProductVariant(storeName:string, accessToken:string, productVariantId:string, productVariant:any): Promise<any> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyProductVariantUpdateURI = shopifyRestURI + 'variants/' + productVariantId + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        let productVariantObject = new ShopifyProductVariantObject();
        productVariantObject.variant = productVariant;

        const request = this.httpService.put(shopifyProductVariantUpdateURI, productVariantObject, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        return data;

    }
    /*******************************************************************************/
    /* INVENTORY METHODS
    /******************************************************************************/

    async getShopifyInventoryItemsByProductId(storeName:string, accessToken:string, productId: string): Promise<ShopifyInventoryItems> {

        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyProductVariants = await this.getShopifyProductVariantsByProductId(storeName, accessToken, productId);
        let shopifyInventoryItemIds = "";

        for(let i=0; i<shopifyProductVariants.variants.length; i++) {
            shopifyInventoryItemIds += shopifyProductVariants.variants[i].inventory_item_id + ",";
        }
        
        const shopifyInventoryItemURI = shopifyRestURI + 'inventory_items.json' + '?ids=' + shopifyInventoryItemIds;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyInventoryItemURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);
        
        let shopifyInventoryItem: ShopifyInventoryItem[] = [];

        for(let i=0; i<data.inventory_items.length; i++) {
            let shopifyInventoryItemObject = new ShopifyInventoryItem();
            shopifyInventoryItemObject.id = data.inventory_items[i].id;
            shopifyInventoryItemObject.cost = data.inventory_items[i].cost;
            
            shopifyInventoryItem.push(shopifyInventoryItemObject);
        }

        let shopifyInventoryItems = new ShopifyInventoryItems();
        shopifyInventoryItems.inventory_items = shopifyInventoryItem;

        return shopifyInventoryItems;
        
    }

    async getShopifyInventoryItemById(storeName:string, accessToken:string, inventoryItemId: number): Promise<ShopifyInventoryItem> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryItemURI = shopifyRestURI + 'inventory_items/' + inventoryItemId + '.json'; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyInventoryItemURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);
        
        let shopifyInventoryItem = new ShopifyInventoryItem();
        shopifyInventoryItem.id = data.inventory_item.id;
        shopifyInventoryItem.cost = data.inventory_item.cost;
       

        return shopifyInventoryItem;
        
    }

    async getShopifyInventoryLevelsByInventoryItemId(storeName:string, accessToken:string, inventoryItemId: number): Promise<ShopifyInventoryLevels> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels.json' + '?inventory_item_ids=' + inventoryItemId;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyInventoryLevelURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);

        let shopifyInventoryLevel: ShopifyInventoryLevel[] = [];
        
        for(let i=0; i<data.inventory_levels.length; i++) {
            let shopifyInventoryLevelObject = new ShopifyInventoryLevel();
            shopifyInventoryLevelObject.inventory_item_id = data.inventory_levels[i].inventory_item_id;
            shopifyInventoryLevelObject.available = data.inventory_levels[i].available;
            shopifyInventoryLevelObject.location_id = data.inventory_levels[i].location_id;

            shopifyInventoryLevel.push(shopifyInventoryLevelObject);
        }

        let shopifyInventoryLevels = new ShopifyInventoryLevels();
        shopifyInventoryLevels.inventory_levels = shopifyInventoryLevel;

        return shopifyInventoryLevels;
        
    }

    async updateShopifyInventoryItem(storeName:string, accessToken:string, invetoryItem: ShopifyInventoryItem): Promise<ShopifyInventoryItem> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryItemURI = shopifyRestURI + 'inventory_items/' + invetoryItem.id + '.json'; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const data = {
            inventory_item: {
                id: invetoryItem.id,
                cost: invetoryItem.cost
            }
        }

        const request = this.httpService.put(shopifyInventoryItemURI, data, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        await lastValueFrom(request);
        
        return invetoryItem
    }

    async updateShopifyInventoryLevel(storeName:string, accessToken:string, inventoryLevel: ShopifyInventoryLevel): Promise<ShopifyInventoryLevel> {
            
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels/set.json'; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const data = {
            location_id: inventoryLevel.location_id,
            inventory_item_id: inventoryLevel.inventory_item_id,
            available: inventoryLevel.available
        }

        const request = this.httpService.post(shopifyInventoryLevelURI, data, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        await lastValueFrom(request);
        
        return inventoryLevel
    }

    async disconnectShopifyInventoryLevel(storeName:string, accessToken:string, inventoryItemId: number, locationId: number): Promise<number> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels.json?inventory_item_id=' + inventoryItemId + '&location_id=' + locationId; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.delete(shopifyInventoryLevelURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        await lastValueFrom(request);
        
        return inventoryItemId;
    }

    async connectShopifyInventoryLevel(storeName:string, accessToken:string, inventoryItemId: number, locationId: number): Promise<number> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels/connect.json'; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const data = {
            location_id: locationId,
            inventory_item_id: inventoryItemId,
        }

        const request = this.httpService.post(shopifyInventoryLevelURI, data, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        await lastValueFrom(request);
        
        return inventoryItemId;
    }

    /*******************************************************************************/
    /* LOCATION METHODS
    /******************************************************************************/

    async getShopifyLocations(storeName:string, accessToken:string): Promise<ShopifyLocations> {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyLocationURI = shopifyRestURI + 'locations.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyLocationURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                  throw new InternalServerErrorException(error.response.data);
                }),
              );

        const data = await lastValueFrom(request);
        
        let shopifyLocation: ShopifyLocation[] = [];

        for(let i=0; i<data.locations.length; i++) {
            let shopifyLocationObject = new ShopifyLocation();
            shopifyLocationObject.id = data.locations[i].id;
            shopifyLocationObject.name = data.locations[i].name;
            shopifyLocationObject.address1 = data.locations[i].address1;
            shopifyLocationObject.city = data.locations[i].city;

            shopifyLocation.push(shopifyLocationObject);

        }

        let shopifyLocations = new ShopifyLocations();
        shopifyLocations.locations = shopifyLocation;

        return shopifyLocations;
        
    }

    /*******************************************************************************/
    /* UTILITY METHODS
    /******************************************************************************/
    async getShopifyRestURIByStoreName(storeName:string): Promise<string> {
        return this.shopifyRestURLPrefix + storeName + this.shopifyRestURL + this.shopifyAPIVersion + '/';
    }

}
