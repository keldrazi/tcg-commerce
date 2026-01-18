export class ShopifyWebhookObject {
    webhook: ShopifyWebhook;
}

export class ShopifyWebhook {
    address: string;
    topic: string;
    format: string;
}