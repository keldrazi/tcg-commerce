//PRODUCT TYPES;
export class ShopifyProductImage{
    src: string;
}

export class ShopifyProductObject {
    title: string;
    body_html: string;
    handle: string;
    vendor: string;
    product_type: string;
    images: ShopifyProductImage[];
    variants: ShopifyProductVariant[];
    metafields: ShopifyProductMetafieldObject[];
}

export class ShopifyProduct {
    product: ShopifyProductObject;
}

export class ShopifyProductUpdate {
    product: any;
}

//PRODUCT VARIANT TYPES;
export class ShopifyProductVariant {
    id: number;
    name: string;
    option1: string;
    price: string;
    inventory_management: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    barcode: string;
    sku: string;
}
 
export class ShopifyProductVariants {
    variants: ShopifyProductVariant[];
 }

export class ShopifyProductVariantObject {
    variant: ShopifyProductVariant;
}

//METAFIELD TYPES;
export class ShopifyProductMetafieldObject {
    key: string;
    value: any;
    namespace: string;
    type: string;
 }


export class ShopifyProductMetafield {
    metafield: ShopifyProductMetafieldObject;
}

export class ShopifyProductMetafieldUpdate {
    metafield: any;
}

//INVENTORY TYPES;
export class ShopifyInventoryItem {
    id: number;
    cost: string;
}

export class ShopifyInventoryItems {
    inventory_items: ShopifyInventoryItem[];
}

export class ShopifyInventoryLevels {
    inventory_levels: ShopifyInventoryLevel[];
}

export class ShopifyInventoryLevel {
    inventory_item_id: number;
    available: number;
    location_id: number;
}

export class ShopifyInventoryItemObject {
    inventory_item: ShopifyInventoryItem;
}

//LOCATION TYPES;
export class ShopifyLocation {
    id: number;
    name: string;
    address1: string;
    city: string;
}

export class ShopifyLocations {
    locations: ShopifyLocation[];
}