import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryBatchLoadJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.entity';
import { InventoryBatchLoadJobProductCardDTO, CreateInventoryBatchLoadJobProductCardDTO } from './dto/inventory.batch.load.job.product.card.dto';
import { INVENTORY_LOAD_JOB_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/load/job/card/inventory.load.job.card.contants';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class InventoryBatchLoadJobProductCardService {

    constructor(
        @InjectRepository(InventoryBatchLoadJobProductCard) private inventoryBatchLoadJobProductCardRepository: Repository<InventoryBatchLoadJobProductCard>
    ) { }

    async getInventoryBatchLoadJobProductCardsByCommerceAccountId(commerceAccountId: string, productLineId: string) {

        let inventoryBatchLoadJobProductCards = await this.inventoryBatchLoadJobProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineId: productLineId
            }
        });

        if(inventoryBatchLoadJobProductCards == null) {
            return [];
        }

        let inventoryBatchLoadJobProductCardDTOs: InventoryBatchLoadJobProductCardDTO[] = [];

        for(let i = 0; i < inventoryBatchLoadJobProductCards.length; i++) {
            let inventoryBatchLoadJobProductCard = inventoryBatchLoadJobProductCards[i];
            //MAP TO DTO;
            let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

            inventoryBatchLoadJobProductCardDTOs.push(inventoryBatchLoadJobProductCardDTO);
        }

        return inventoryBatchLoadJobProductCardDTOs;
    }

    async getInventoryBatchLoadJobProductCardByInventoryBatchLoadJobProductCardId(inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.findOne({
            where: {
                inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId
            }
        });

        if(inventoryBatchLoadJobProductCard == null) {
            return undefined;
        }

        //MAP TO DTO;
        let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

        return inventoryBatchLoadJobProductCardDTO;

    }

    async createInventoryBatchLoadJobProductCard(createInventoryBatchLoadJobProductCardDTO: CreateInventoryBatchLoadJobProductCardDTO) {

        let inventoryBatchLoadJobProductCardCode = await this.createInventoryBatchLoadJobProductCardCode(createInventoryBatchLoadJobProductCardDTO.productLineCode, createInventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardSetCode, createInventoryBatchLoadJobProductCardDTO.commerceLocationName);

        let inventoryBatchLoadJobProductCard = this.inventoryBatchLoadJobProductCardRepository.create({ ...createInventoryBatchLoadJobProductCardDTO });
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardCode = inventoryBatchLoadJobProductCardCode;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardDate = new Date();
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardStatus = INVENTORY_LOAD_JOB_CARD_STATUS.PROCESSING;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardData = JSON.stringify({});
        inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);
        
        let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard });
        
        return inventoryBatchLoadJobProductCardDTO;
        
    }

    
    async createInventoryBatchLoadJobProductCardCode(productLineCode: string, productSetCode: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryBatchLoadJobProductCardCode = productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryBatchLoadJobProductCardCode;
    }


    async updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId: string, inventoryBatchLoadJobProductCardStatus: string) {
        let inventoryBatchLoadJobProductCard = await this.getInventoryBatchLoadJobProductCardByInventoryBatchLoadJobProductCardId(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardStatus = inventoryBatchLoadJobProductCardStatus;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardUpdateDate = new Date();

        await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);

        return true;
    }

    async updateInventoryBatchLoadJobProductCardData(inventoryBatchLoadJobProductCardId: string, inventoryBatchLoadJobProductCardData: any) {
        let inventoryBatchLoadJobProductCard = await this.getInventoryBatchLoadJobProductCardByInventoryBatchLoadJobProductCardId(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardData = JSON.stringify(inventoryBatchLoadJobProductCardData);
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardUpdateDate = new Date();

        await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);

        return true;
    }



    /* EVENT LISTENERS */
    @OnEvent('inventory.load.job.card.update.status')
    async handleInventoryBatchLoadJobProductCardStatusEvent(payload: any) {

        let inventoryBatchLoadJobProductCardId = payload.inventoryBatchLoadJobProductCardId;
        let inventoryBatchLoadJobProductCardStatus = payload.inventoryBatchLoadJobProductCardStatus;

        await this.updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId, inventoryBatchLoadJobProductCardStatus);

    }

    @OnEvent('inventory.load.job.card.update.data')
    async handleInventoryBatchLoadJobProductCardDataEvent(payload: any) {

        let inventoryBatchLoadJobProductCardId = payload.inventoryBatchLoadJobProductCardId;
        let inventoryBatchLoadJobProductCardData = payload.inventoryBatchLoadJobProductCardData;

        await this.updateInventoryBatchLoadJobProductCardData(inventoryBatchLoadJobProductCardId, inventoryBatchLoadJobProductCardData);

    }

}