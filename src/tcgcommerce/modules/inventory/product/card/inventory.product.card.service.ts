import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardsDTO, InventoryProductCardDTO, CreateInventoryProductCardsDTO, CreateInventoryProductCardDTO, UpdateInventoryProductCardsDTO, UpdateInventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';

@Injectable()
export class InventoryProductCardService {

    //VENDOR DATA;
    private MTG_SET_VENDOR_ID = "67d0735c-da47-480d-b3e2-651b9fc5a2d8"; //WoTC;
    private MTG_SET_LINE_ID = "1258359b-bb37-4323-8749-cd4fa40037f9"; //Magic: The Gathering;

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
    ) { }

    async getInventoryProductCardByInventoryProductCardId(inventoryProductCardId: string) {
        let inventoryProductCard = await this.inventoryProductCardRepository.findOne({
            where: {
                inventoryProductCardId: inventoryProductCardId
            }
        }); 

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCard == null) {
            return null;
        }

        let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard});
        
        return inventoryProductCardDTO;
    }
    
    async getInventoryProductCardsByCommerceAccountIdAndCommerceLocationIdAndProductCardItemId(commerceAccountId: string, commerceLocationId: string, productCardItemId: string) {
        let inventoryProductCards = await this.inventoryProductCardRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productCardItemId: productCardItemId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCards == null) {
            return null;
        }

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard});
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }
        
        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;
        
        return inventoryProductCardsDTO;
    }

    async getInventoryProductCardsByCommerceAccountIdAndProductCardItemId(commerceAccountId: string, productCardItemId: string) {
        let inventoryProductCards = await this.inventoryProductCardRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productCardItemId: productCardItemId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCards == null) {
            return null;
        }

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard});

            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }
        
        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;
        
        return inventoryProductCardsDTO;
    }

    async getInventoryProductCardsByCommerceAccountIdAndProductSetAbbreviation(commerceAccountId: string, productSetAbbreviation: string) {
        let inventoryProductCards = await this.inventoryProductCardRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productSetAbbreviation: productSetAbbreviation,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCards == null) {
            return null;
        }

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard});

            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }
        
        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;
        
        return inventoryProductCardsDTO;
    }

    async getInventoryProductCardsByCommerceAccountIdAndCommerceLocationIdAndCommerceLocationIdProductSetAbbreviation(commerceAccountId: string, commerceLocationId: string, productSetAbbreviation: string) {
        let inventoryProductCards = await this.inventoryProductCardRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productSetAbbreviation: productSetAbbreviation,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCards == null) {
            return null;
        }

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard});

            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }
        
        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;
        
        return inventoryProductCardsDTO;
    }

    async createInventoryProductCard(createInventoryProductCardsDTO: CreateInventoryProductCardsDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD INVENTORY ALREADY EXISTS;
        let inventoryProductCards = await this.getInventoryProductCardsByCommerceAccountIdAndProductCardItemId(createInventoryProductCardsDTO.commerceAccountId, createInventoryProductCardsDTO.productCardItemId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCards != null) {
            return null;
        }

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < createInventoryProductCardsDTO.createInventoryProductCardDTOs.length; i++) {
            let createInventoryProductCardDTO = createInventoryProductCardsDTO.createInventoryProductCardDTOs[i];
        
            let newInventoryProductCard = this.inventoryProductCardRepository.create({ ...createInventoryProductCardDTO });
            newInventoryProductCard = await this.inventoryProductCardRepository.save(newInventoryProductCard);

            let inventoryProductCardDTO = await this.getInventoryProductCardByInventoryProductCardId(newInventoryProductCard.inventoryProductCardId);

            if(inventoryProductCardDTO == null) {
                continue;
            }

            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.commerceAccountId = createInventoryProductCardsDTO.commerceAccountId;
        inventoryProductCardsDTO.productCardItemId = createInventoryProductCardsDTO.productCardItemId;
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;

        return inventoryProductCardsDTO;
    } 

    async updateInventoryProductCard(updateInventoryProductCardsDTO: UpdateInventoryProductCardsDTO) {


        //UPDATE THE PRODUCT CARD INVENTORYS;
        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for(let i=0; i < updateInventoryProductCardsDTO.updateInventoryProductCardDTOs.length; i++) {
            let updateInventoryProductCardDTO = updateInventoryProductCardsDTO.updateInventoryProductCardDTOs[i];
            
            //GET THE PRODUCT CARD INVENTORY TO UPDATE;
            let inventoryProductCard = await this.inventoryProductCardRepository.findOne({
                where: {
                    inventoryProductCardId: updateInventoryProductCardDTO.inventoryProductCardId
                }
            });

            //TO DO: CREATE AN ERROR TO RETURN;
            if(inventoryProductCard == null) {
                continue;
            }

            inventoryProductCard.commerceLocationId = updateInventoryProductCardDTO.commerceLocationId;
            inventoryProductCard.inventoryProductCardQty = updateInventoryProductCardDTO.inventoryProductCardQty;
            inventoryProductCard.inventoryProductCardMaxQty = updateInventoryProductCardDTO.inventoryProductCardMaxQty;
            inventoryProductCard.inventoryProductCardReserveQty = updateInventoryProductCardDTO.inventoryProductCardReserveQty;
            inventoryProductCard.inventoryProductCardPrice = updateInventoryProductCardDTO.inventoryProductCardPrice;
            inventoryProductCard.inventoryProductCardOverridePriceEnabled = updateInventoryProductCardDTO.inventoryProductCardOverridePriceEnabled;
            inventoryProductCard.inventoryProductCardOverridePrice = updateInventoryProductCardDTO.inventoryProductCardOverridePrice;
            inventoryProductCard.inventoryProductCardMetadata = updateInventoryProductCardDTO.inventoryProductCardMetadata;
            inventoryProductCard.inventoryProductCardUpdateDate = new Date();

            inventoryProductCard = await this.inventoryProductCardRepository.save(inventoryProductCard);

            let inventoryProductCardDTO = await this.getInventoryProductCardByInventoryProductCardId(inventoryProductCard.inventoryProductCardId);
            
            if(inventoryProductCardDTO == null) {
                continue;
            }
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        let inventoryProductCardsDTO = new InventoryProductCardsDTO();
        inventoryProductCardsDTO.commerceAccountId = updateInventoryProductCardsDTO.commerceAccountId;
        inventoryProductCardsDTO.productCardItemId = updateInventoryProductCardsDTO.productCardItemId;
        inventoryProductCardsDTO.inventoryProductCardDTOs = inventoryProductCardDTOs;

        return inventoryProductCardsDTO;
        
    }
}