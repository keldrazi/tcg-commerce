import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { InventoryProductCardServiceCreateJobItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/item/dto/inventory.product.card.service.create.job.item.dto';

@Injectable()
export class InventoryProductCardService {


    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
    ) { }


    async getInventoryProductCardById(inventoryProductCardId: string): Promise<InventoryProductCardDTO> {
        let inventoryProductCard = await this.inventoryProductCardRepository.findOneOrFail({
            where: {
                inventoryProductCardId: inventoryProductCardId
            }
        });

        let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard })
        return inventoryProductCardDTO;
    }

    async getInventoryProductCardsByCommerceAccountId(commerceAccountId: string): Promise<InventoryProductCardDTO[]> {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
            }
        });

        if(!inventoryProductCards) {
            return inventoryProductCardDTOs;
        }

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard })
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
    }

    async getInventoryProductCardsByCommerceAccountIdAndCommerceLocationId(commerceAccountId: string, commerceLocationId: string): Promise<InventoryProductCardDTO[]> {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId
            }
        });

        if(!inventoryProductCards) {
            return inventoryProductCardDTOs;
        }

        for(let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard })
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
    }


    
    
    async getInventoryProductCardsByProductSetId(commerceAccountId: string, commerceLocationId: string, productSetId: string, productLanguageId: string): Promise<InventoryProductCardDTO[]> {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productSetId: productSetId,
                productLanguageId: productLanguageId
            }
        });

        if(!inventoryProductCards) {
            return inventoryProductCardDTOs;
        }

        
        for (let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = ({ ...inventoryProductCard })
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
    }

    /*
    async getInventoryProductCardsByProductCardId(commerceAccountId: string, commerceLocationId: string, productCardId: string, productLanguageId: string): Promise<InventoryProductCardDTO[] | null> {

        
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                productCardId: productCardId,
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productLanguageId: productLanguageId
            }
        });

        if(inventoryProductCards == null) {
            return null;
        }
        
        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];

        for (let i=0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = await this.createInventoryProductCardDTO(inventoryProductCard);
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;
        
    }
    

    async getInventoryProductCardByProductCardPrintingId(commerceAccountId: string, commerceLocationId: string, productCardId: string, productCardPrintingId: string, productLanguageId: string): Promise<InventoryProductCardDTO | null> {

        let inventoryProductCard = await this.inventoryProductCardRepository.findOne({
            where: {
                productCardId: productCardId,
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productCardPrintingId: productCardPrintingId,
                productLanguageId: productLanguageId
            }
        });

        if(inventoryProductCard == null) {
            return null;
        }
        
        let inventoryProductCardDTO: InventoryProductCardDTO = await this.createInventoryProductCardDTO(inventoryProductCard);
        
        return inventoryProductCardDTO;
        
    }
    */

    async createInventoryProductCardFromCreateJob(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobItemDTO): Promise<InventoryProductCardDTO> {
        let inventoryProductCard = await this.inventoryProductCardRepository.findOne({
            where: {
                productCardId: inventoryProductCardServiceCreateJobDTO.productCardId,
                commerceAccountId: inventoryProductCardServiceCreateJobDTO.commerceAccountId,
                commerceLocationId: inventoryProductCardServiceCreateJobDTO.commerceLocationId,
            }
        });
        
        if(inventoryProductCard) {
            throw new ConflictException('Inventory Product Card already exists');
        }

        inventoryProductCard = this.inventoryProductCardRepository.create({
            productCardId: inventoryProductCardServiceCreateJobDTO.productCardId,
            productCardTCGdbId: inventoryProductCardServiceCreateJobDTO.productCardTCGdbId,
            productCardTCGPlayerId: inventoryProductCardServiceCreateJobDTO.productCardTCGPlayerId,
            commerceAccountId: inventoryProductCardServiceCreateJobDTO.commerceAccountId,
            commerceLocationId: inventoryProductCardServiceCreateJobDTO.commerceLocationId,
            inventoryProductCardIsVerified: true,
            inventoryProductCardIsActive: true
        });

        await this.inventoryProductCardRepository.save(inventoryProductCard);

        console.log('Created Inventory Product Card from Batch Load: ' + inventoryProductCard.inventoryProductCardId);
        
        return await this.getInventoryProductCardById(inventoryProductCard.inventoryProductCardId);

    }


    async updateInventoryProductCard(inventoryProductCardDTO: InventoryProductCardDTO): Promise<InventoryProductCardDTO | null> {
        let inventoryProductCard = await this.inventoryProductCardRepository.findOneOrFail({
            where: {
                inventoryProductCardId: inventoryProductCardDTO.inventoryProductCardId
            }
        });

        inventoryProductCard.inventoryProductCardIsVerified = inventoryProductCardDTO.inventoryProductCardIsVerified;
        inventoryProductCard.inventoryProductCardIsActive = inventoryProductCardDTO.inventoryProductCardIsActive;
        inventoryProductCard.inventoryProductCardUpdateDate = new Date();

        await this.inventoryProductCardRepository.save(inventoryProductCard);

        return await this.getInventoryProductCardById(inventoryProductCard.inventoryProductCardId);

    }
}