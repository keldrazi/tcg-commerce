import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardDTO, CreateInventoryProductCardsDTO, CreateInventoryProductCardDTO, UpdateInventoryProductCardsDTO, UpdateInventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';

@Injectable()
export class InventoryProductCardService {


    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
    ) { }

    async getInventoryProductCardsByCommerceAccountId(commerceAccountId: string) {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
            }
        });

        for (let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = new InventoryProductCardDTO();
            inventoryProductCardDTO.inventoryProductCardId = inventoryProductCard.inventoryProductCardId;
            inventoryProductCardDTO.productCardId = inventoryProductCard.productCardId;
            inventoryProductCardDTO.productCardTCGdbId = inventoryProductCard.productCardTCGdbId;
            inventoryProductCardDTO.productCardTCGPlayerId = inventoryProductCard.productCardTCGPlayerId;
            inventoryProductCardDTO.commerceAccountId = inventoryProductCard.commerceAccountId;
            inventoryProductCardDTO.commerceLocationId = inventoryProductCard.commerceLocationId;
            inventoryProductCardDTO.productVendorId = inventoryProductCard.productVendorId;
            inventoryProductCardDTO.productLineId = inventoryProductCard.productLineId;
            inventoryProductCardDTO.productTypeId = inventoryProductCard.productTypeId;
            inventoryProductCardDTO.productLanguageId = inventoryProductCard.productLanguageId;
            inventoryProductCardDTO.productLanguageCode = inventoryProductCard.productLanguageCode;
            inventoryProductCardDTO.productSetId = inventoryProductCard.productSetId;
            inventoryProductCardDTO.productSetCode = inventoryProductCard.productSetCode;
            inventoryProductCardDTO.productCardPrintingId = inventoryProductCard.productCardPrintingId;
            inventoryProductCardDTO.productCardPrintingName = inventoryProductCard.productCardPrintingName;
            inventoryProductCardDTO.inventoryProductCardItems = JSON.parse(inventoryProductCard.inventoryProductCardItems) as InventoryProductCardItem[];
            inventoryProductCardDTO.inventoryProductCardIsVerified = inventoryProductCard.inventoryProductCardIsVerified;
            inventoryProductCardDTO.inventoryProductCardIsActive = inventoryProductCard.inventoryProductCardIsActive;
            inventoryProductCardDTO.inventoryProductCardCreateDate = inventoryProductCard.inventoryProductCardCreateDate;
            inventoryProductCardDTO.inventoryProductCardUpdateDate = inventoryProductCard.inventoryProductCardUpdateDate;
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
    }


    async getInventoryProductCardsBySetId(commerceAccountId: string, commerceLocationId: string, productSetId: string, productVendorId: string, productLineId: string, productTypeId: string, productLanguageId: string) {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productSetId: productSetId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId,
                productLanguageId: productLanguageId
            }
        });

        for (let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = new InventoryProductCardDTO();
            inventoryProductCardDTO.inventoryProductCardId = inventoryProductCard.inventoryProductCardId;
            inventoryProductCardDTO.productCardId = inventoryProductCard.productCardId;
            inventoryProductCardDTO.productCardTCGdbId = inventoryProductCard.productCardTCGdbId;
            inventoryProductCardDTO.productCardTCGPlayerId = inventoryProductCard.productCardTCGPlayerId;
            inventoryProductCardDTO.commerceAccountId = inventoryProductCard.commerceAccountId;
            inventoryProductCardDTO.commerceLocationId = inventoryProductCard.commerceLocationId;
            inventoryProductCardDTO.productVendorId = inventoryProductCard.productVendorId;
            inventoryProductCardDTO.productLineId = inventoryProductCard.productLineId;
            inventoryProductCardDTO.productTypeId = inventoryProductCard.productTypeId;
            inventoryProductCardDTO.productLanguageId = inventoryProductCard.productLanguageId;
            inventoryProductCardDTO.productLanguageCode = inventoryProductCard.productLanguageCode;
            inventoryProductCardDTO.productSetId = inventoryProductCard.productSetId;
            inventoryProductCardDTO.productSetCode = inventoryProductCard.productSetCode;
            inventoryProductCardDTO.productCardPrintingId = inventoryProductCard.productCardPrintingId;
            inventoryProductCardDTO.productCardPrintingName = inventoryProductCard.productCardPrintingName;
            inventoryProductCardDTO.inventoryProductCardItems = JSON.parse(inventoryProductCard.inventoryProductCardItems) as InventoryProductCardItem[];
            inventoryProductCardDTO.inventoryProductCardIsVerified = inventoryProductCard.inventoryProductCardIsVerified;
            inventoryProductCardDTO.inventoryProductCardIsActive = inventoryProductCard.inventoryProductCardIsActive;
            inventoryProductCardDTO.inventoryProductCardCreateDate = inventoryProductCard.inventoryProductCardCreateDate;
            inventoryProductCardDTO.inventoryProductCardUpdateDate = inventoryProductCard.inventoryProductCardUpdateDate;
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
    }
            
}