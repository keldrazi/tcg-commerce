import { Injectable } from '@nestjs/common';
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
    async getShop(storeName:string, accessToken:string, productId: string) {

        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
    
        
        const shopifyShopURI = shopifyRestURI + 'shop.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyShopURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyShopURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }
    
    /*******************************************************************************/
    /* PRODUCT METHODS
    /******************************************************************************/
    async getProductsByProductType(storeName: string, accessToken: string, productType: string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyProductTypeURI = shopifyRestURI + 'products.json?product_type=' + productType;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductTypeURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyProductTypeURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async getProductByProductHandle(storeName: string, accessToken: string, productHandle: string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyProductHandleURI = shopifyRestURI + 'products.json?handle=' + productHandle;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductHandleURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyProductHandleURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async createProduct(storeName: string, accessToken: string, shopifyProduct: ShopifyProduct) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyCreateProductURI = shopifyRestURI + 'products.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.post(shopifyCreateProductURI, shopifyProduct, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyCreateProductURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    async updateProduct(storeName: string, accessToken: string, shopifyProduct: ShopifyProductUpdate) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyCreateProductURI = shopifyRestURI + 'products/' + shopifyProduct.product.id + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.put(shopifyCreateProductURI, shopifyProduct, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyCreateProductURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    /*******************************************************************************/
    /* PRODUCT NETAFIELD METHODS
    /******************************************************************************/
    async getProductMetafieldsByProductId(storeName: string, accessToken: string, productId: string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyMetafieldURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyMetafieldURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async getProductMetafieldsByMetafieldId(storeName: string, accessToken: string, productId: string, metafieldId: string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields/' + metafieldId + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyMetafieldURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyMetafieldURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
        
    }

    async createProductMetafield(storeName: string, accessToken: string, productId: string, shopifyProductMetafield: ShopifyProductMetafield) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyCreateProductMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.post(shopifyCreateProductMetafieldURI, shopifyProductMetafield, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyCreateProductMetafieldURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }

    async updateProductMetafield(storeName: string, accessToken: string, productId: string, shopifyProductMetafield: any) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyUpdateProductMetafieldURI = shopifyRestURI + 'products/' + productId + '/metafields/' + shopifyProductMetafield.metafield.id + '.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.put(shopifyUpdateProductMetafieldURI, shopifyProductMetafield, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyUpdateProductMetafieldURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;
    }
    
    /*******************************************************************************/
    /* PRODUCT VARIANT METHODS
    /******************************************************************************/
    async getProductVariantsByProductId(storeName:string, accessToken:string, productId:string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyProductVariantURI = shopifyRestURI + 'products/' + productId + '/variants.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyProductVariantURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyProductVariantURI + 'Error: ' + e);
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

    async updateProductVariant(storeName:string, accessToken:string, productVariantId:string, productVariant:any) {
        
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
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyProductVariantUpdateURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);

        return data;

    }
    /*******************************************************************************/
    /* INVENTORY METHODS
    /******************************************************************************/

    async getInventoryItemsByProductId(storeName:string, accessToken:string, productId: string) {

        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);
        
        const shopifyProductVariants = await this.getProductVariantsByProductId(storeName, accessToken, productId);

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
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyInventoryItemURI + 'Error: ' + e);
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

    async getInventoryItemById(storeName:string, accessToken:string, inventoryItemId: number) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryItemURI = shopifyRestURI + 'inventory_items/' + inventoryItemId + '.json'; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyInventoryItemURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyInventoryItemURI + 'Error: ' + e);
                }),
              );

        const data = await lastValueFrom(request);
        
        let shopifyInventoryItem = new ShopifyInventoryItem();
        shopifyInventoryItem.id = data.inventory_item.id;
        shopifyInventoryItem.cost = data.inventory_item.cost;
       

        return shopifyInventoryItem;
        
    }

    async getInventoryLevelsByInventoryItemId(storeName:string, accessToken:string, inventoryItemId: number) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels.json' + '?inventory_item_ids=' + inventoryItemId;
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyInventoryLevelURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                throw new ForbiddenException('API not available: ' + shopifyInventoryLevelURI + 'Error: ' + e);
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

    async updateInventoryItem(storeName:string, accessToken:string, invetoryItem: ShopifyInventoryItem){
        
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
                catchError(e => {
                throw new ForbiddenException('API not available: ' + shopifyInventoryItemURI + 'Error: ' + e);
                }),
            );

        await lastValueFrom(request);
        
        return invetoryItem
    }

    async updateInventoryLevel(storeName:string, accessToken:string, inventoryLevel: ShopifyInventoryLevel){
            
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
                catchError(e => {
                throw new ForbiddenException('API not available: ' + shopifyInventoryLevelURI + 'Error: ' + e);
                }),
            );

        await lastValueFrom(request);
        
        return inventoryLevel
    }

    async disconnectInventoryLevel(storeName:string, accessToken:string, inventoryItemId: number, locationId: number){
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyInventoryLevelURI = shopifyRestURI + 'inventory_levels.json?inventory_item_id=' + inventoryItemId + '&location_id=' + locationId; 
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.delete(shopifyInventoryLevelURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                console.log(e);
                throw new ForbiddenException('API not available: ' + shopifyInventoryLevelURI + 'Error: ' + e);
                }),
            );

        await lastValueFrom(request);
        
        return inventoryItemId;
    }

    async connectInventoryLevel(storeName:string, accessToken:string, inventoryItemId: number, locationId: number){
        
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
                catchError(e => {
                throw new ForbiddenException('API not available: ' + shopifyInventoryLevelURI + 'Error: ' + e);
                }),
            );

        await lastValueFrom(request);
        
        return inventoryItemId;
    }

    /*******************************************************************************/
    /* LOCATION METHODS
    /******************************************************************************/

    async getLocations(storeName:string, accessToken:string) {
        
        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyLocationURI = shopifyRestURI + 'locations.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.get(shopifyLocationURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(e => {
                  throw new ForbiddenException('API not available: ' + shopifyLocationURI + 'Error: ' + e);
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
    async getShopifyRestURIByStoreName(storeName:string) {
        return this.shopifyRestURLPrefix + storeName + this.shopifyRestURL + this.shopifyAPIVersion + '/';
    }

}
