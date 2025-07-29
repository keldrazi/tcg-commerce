import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryLoadJobCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/load/job/card/inventory.load.job.card.entity';
import { InventoryLoadJobCardDTO, CreateInventoryLoadJobCardDTO } from './dto/inventory.load.job.card.dto';
import { INVENTORY_LOAD_JOB_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/load/job/card/inventory.load.job.card.contants';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class InventoryLoadJobCardService {

    constructor(
        @InjectRepository(InventoryLoadJobCard) private inventoryLoadJobCardRepository: Repository<InventoryLoadJobCard>
    ) { }

    async getInventoryLoadJobCardsByCommerceAccountId(commerceAccountId: string, productLineId: string) {

        let inventoryLoadJobCards = await this.inventoryLoadJobCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineId: productLineId
            }
        });

        if(inventoryLoadJobCards == null) {
            return [];
        }

        let inventoryLoadJobCardDTOs: InventoryLoadJobCardDTO[] = [];

        for(let i = 0; i < inventoryLoadJobCards.length; i++) {
            let inventoryLoadJobCard = inventoryLoadJobCards[i];
            //MAP TO DTO;
            let inventoryLoadJobCardDTO: InventoryLoadJobCardDTO = ({ ...inventoryLoadJobCard});

            inventoryLoadJobCardDTOs.push(inventoryLoadJobCardDTO);
        }

        return inventoryLoadJobCardDTOs;
    }

    async getInventoryLoadJobCardByInventoryLoadJobCardId(inventoryLoadJobCardId: string) {
        let inventoryLoadJobCard = await this.inventoryLoadJobCardRepository.findOne({
            where: {
                inventoryLoadJobCardId: inventoryLoadJobCardId
            }
        });

        if(inventoryLoadJobCard == null) {
            return undefined;
        }

        //MAP TO DTO;
        let inventoryLoadJobCardDTO: InventoryLoadJobCardDTO = ({ ...inventoryLoadJobCard});

        return inventoryLoadJobCardDTO;

    }

    async createInventoryLoadJobCard(createInventoryLoadJobCardDTO: CreateInventoryLoadJobCardDTO) {

        let inventoryLoadJobCardCode = await this.createInventoryLoadJobCardCode(createInventoryLoadJobCardDTO.productLineCode, createInventoryLoadJobCardDTO.inventoryLoadJobCardSetCode, createInventoryLoadJobCardDTO.commerceLocationName);

        let inventoryLoadJobCard = this.inventoryLoadJobCardRepository.create({ ...createInventoryLoadJobCardDTO });
        inventoryLoadJobCard.inventoryLoadJobCardCode = inventoryLoadJobCardCode;
        inventoryLoadJobCard.inventoryLoadJobCardDate = new Date();
        inventoryLoadJobCard.inventoryLoadJobCardStatus = INVENTORY_LOAD_JOB_CARD_STATUS.PROCESSING;
        inventoryLoadJobCard.inventoryLoadJobCardData = JSON.stringify({});
        inventoryLoadJobCard = await this.inventoryLoadJobCardRepository.save(inventoryLoadJobCard);
        
        let inventoryLoadJobCardDTO: InventoryLoadJobCardDTO = ({ ...inventoryLoadJobCard });
        
        return inventoryLoadJobCardDTO;
        
    }

    
    async createInventoryLoadJobCardCode(productLineCode: string, productSetCode: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryLoadJobCardCode = productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryLoadJobCardCode;
    }


    async updateInventoryLoadJobCardStatus(inventoryLoadJobCardId: string, inventoryLoadJobCardStatus: string) {
        let inventoryLoadJobCard = await this.getInventoryLoadJobCardByInventoryLoadJobCardId(inventoryLoadJobCardId);

        if(inventoryLoadJobCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryLoadJobCard.inventoryLoadJobCardStatus = inventoryLoadJobCardStatus;
        inventoryLoadJobCard.inventoryLoadJobCardUpdateDate = new Date();

        await this.inventoryLoadJobCardRepository.save(inventoryLoadJobCard);

        return true;
    }

    async updateInventoryLoadJobCardData(inventoryLoadJobCardId: string, inventoryLoadJobCardData: any) {
        let inventoryLoadJobCard = await this.getInventoryLoadJobCardByInventoryLoadJobCardId(inventoryLoadJobCardId);

        if(inventoryLoadJobCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryLoadJobCard.inventoryLoadJobCardData = JSON.stringify(inventoryLoadJobCardData);
        inventoryLoadJobCard.inventoryLoadJobCardUpdateDate = new Date();

        await this.inventoryLoadJobCardRepository.save(inventoryLoadJobCard);

        return true;
    }



    /* EVENT LISTENERS */
    @OnEvent('inventory.load.job.card.update.status')
    async handleInventoryLoadJobCardStatusEvent(payload: any) {

        let inventoryLoadJobCardId = payload.inventoryLoadJobCardId;
        let inventoryLoadJobCardStatus = payload.inventoryLoadJobCardStatus;

        await this.updateInventoryLoadJobCardStatus(inventoryLoadJobCardId, inventoryLoadJobCardStatus);

    }

    @OnEvent('inventory.load.job.card.update.data')
    async handleInventoryLoadJobCardDataEvent(payload: any) {

        let inventoryLoadJobCardId = payload.inventoryLoadJobCardId;
        let inventoryLoadJobCardData = payload.inventoryLoadJobCardData;

        await this.updateInventoryLoadJobCardData(inventoryLoadJobCardId, inventoryLoadJobCardData);

    }

}