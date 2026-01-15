export class FullfilmentOrderDTO {
    commerceAccountId: string;
    commerceLocationId: string;
    fullfilmentOrderTypeId: string;
    fullfilmentOrderTypeName: string;
    posVendorId: string;
    posVendorName: string;
    fullfilmentOrderCode: string;
    fullfilmentOrderDate: Date;
    fullfilmentOrderDetails: string;
    fullfilmentOrderItemDetails: string;
    fullfilmentOrderItemTotal: number
    fullfilmentOrderPriceTotal: number;
    fullfilmentOrderCreateDate: Date;
    fullfilmentOrderUpdateDate: Date;
}