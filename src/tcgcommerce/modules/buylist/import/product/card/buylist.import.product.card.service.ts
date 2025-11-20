import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistImportProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.entity';
import { CreateBuylistImportProductCardDTO, BuylistImportProductCardDTO } from './dto/buylist.import.product.card.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS, INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NAME } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { BuylistImportProductCardItemService } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.service';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';
import { BuylistImportProductCardProviderTypeService } from './provider/type/buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeDTO } from './provider/type/dto/buylist.import.product.card.provider.type.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistImportProductCardService {

    constructor(
        @InjectRepository(BuylistImportProductCard) private buylistImportProductCardRepository: Repository<BuylistImportProductCard>,
        private buylistImportProductCardItemService: BuylistImportProductCardItemService,
        private awsS3Service: AwsS3Service,
        private buylistImportProductCardProviderTypeService: BuylistImportProductCardProviderTypeService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getBuylistImportProductCardById(buylistImportProductCardId: string) {
            let buylistImportProductCard = await this.buylistImportProductCardRepository.findOne({
                where: {
                    buylistImportProductCardId: buylistImportProductCardId
                }
            });
    
            if(buylistImportProductCard == null) {
               return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
            }
    
            //MAP TO DTO;
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard });

            return buylistImportProductCardDTO;

        }

    async getBuylistImportProductCardsByCommerceAccountId(commerceAccountId: string) {
    
            let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
                where: {
                    commerceAccountId: commerceAccountId
                }
            });
    
            if(buylistImportProductCards == null) {
                return [];
            }
    
            let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];
            for(let i = 0; i < buylistImportProductCards.length; i++) {
                let buylistImportProductCard = buylistImportProductCards[i];
                //MAP TO DTO;
                let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});
    
                buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
            }
    
            return buylistImportProductCardDTOs;
        }
    
    async getBuylistImportProductCardsByCommerceLocationId(commerceLocationId: string) {

        let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
            where: {
                commerceLocationId: commerceLocationId
            }
        });

        if(buylistImportProductCards == null) {
            return [];
        }

        let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];
        for(let i = 0; i < buylistImportProductCards.length; i++) {
            let buylistImportProductCard = buylistImportProductCards[i];
            //MAP TO DTO;
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});

            buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
        }

        return buylistImportProductCardDTOs;
    }

    async getBuylistImportProductCardsByCommerceAccountIdAndProductLineCode(commerceAccountId: string, productLineCode: string) {

        let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineCode: productLineCode
            }
        });

        if(buylistImportProductCards == null) {
            return [];
        }

        let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];
        for(let i = 0; i < buylistImportProductCards.length; i++) {
            let buylistImportProductCard = buylistImportProductCards[i];
            //MAP TO DTO;
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});

            buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
        }

        return buylistImportProductCardDTOs;
    }

    async getBuylistImportProductCardsByCommerceLocationIdAndProductLineCode(commerceLocationId: string, productLineCode: string) {

        let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode
            }
        });

        if(buylistImportProductCards == null) {
            return [];
        }

        let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];
        for(let i = 0; i < buylistImportProductCards.length; i++) {
            let buylistImportProductCard = buylistImportProductCards[i];
            //MAP TO DTO;
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});

            buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
        }

        return buylistImportProductCardDTOs;
    }

    async getBuylistImportProductCardsByCommerceLocationIdAndProductLineCodeAndStatus(commerceLocationId: string, productLineCode: string, buylistImportProductCardStatus: string) {

        let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode,
                buylistImportProductCardStatus: buylistImportProductCardStatus
            }
        });

        if(buylistImportProductCards == null) {
            return [];
        }

        let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];
        for(let i = 0; i < buylistImportProductCards.length; i++) {
            let buylistImportProductCard = buylistImportProductCards[i];
            //MAP TO DTO;
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});

            buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
        }

        return buylistImportProductCardDTOs;
    }


    async getBuylistImportProductCardDetailsById(buylistImportProductCardId: string) {
        let buylistImportProductCard = await this.buylistImportProductCardRepository.findOne({
            where: {
                buylistImportProductCardId: buylistImportProductCardId
            }
        });

        if(buylistImportProductCard == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
        }

        //MAP TO DTO;
        let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});
        let buylistImportProductCardItemDTOs = await this.buylistImportProductCardItemService.getBuylistImportProductCardItemDetailsByJob(buylistImportProductCardDTO);

        if(buylistImportProductCardItemDTOs == null || buylistImportProductCardItemDTOs instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_DETAILS_NOT_FOUND', 'Inventory product card service import job details not found for job ID: ' + buylistImportProductCardId);
        }

        let buylistImportProductCardDetails = {
            buylistImportProductCardDTO,
            buylistImportProductCardItemDTOs
        };

        return buylistImportProductCardDetails;

    }
    
    async getBuylistImportProductCardByOriginalFileName(commerceAccountId: string, commerceLocationId: string, buylistImportProductCardFileOriginalName: string) {
        return await this.buylistImportProductCardRepository.findOne({
            where: { 
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                buylistImportProductCardFileOriginalName: buylistImportProductCardFileOriginalName 
            }
        });
    }

    async createBuylistImportProductCard(buylistImportProductCardFile: Express.Multer.File, createBuylistImportProductCardDTO: CreateBuylistImportProductCardDTO) {

        //CHECK TO SEE IF A FILE WITH THE SAME NAME EXISTS;
        let existingImportJobCard = await this.getBuylistImportProductCardByOriginalFileName(createBuylistImportProductCardDTO.commerceAccountId, createBuylistImportProductCardDTO.commerceLocationId, buylistImportProductCardFile.originalname);

        if(existingImportJobCard != null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_FILE_EXISTS', 'An import job with the same file name already exists. Please rename the file and try again.');
        }

        let buylistImportProductCardProviderTypeDTO = await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypeByName(createBuylistImportProductCardDTO.buylistImportProductCardProviderTypeName);

        if(buylistImportProductCardProviderTypeDTO == null || buylistImportProductCardProviderTypeDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found for name: ' + createBuylistImportProductCardDTO.buylistImportProductCardProviderTypeName);
        }

        let buylistImportProductCardCode = await this.createBuylistImportProductCardCode(createBuylistImportProductCardDTO.productLineCode, createBuylistImportProductCardDTO.buylistImportProductCardProviderTypeName, createBuylistImportProductCardDTO.commerceLocationName);

        //UPLOAD THE FILE TO S3
        let buylistImportProductCardFileURL = await this.uploadBuylistImportProductCardFile(createBuylistImportProductCardDTO.commerceAccountId, buylistImportProductCardFile, buylistImportProductCardCode, buylistImportProductCardProviderTypeDTO);

        let buylistImportProductCard = this.buylistImportProductCardRepository.create({ ...createBuylistImportProductCardDTO });
        buylistImportProductCard.buylistImportProductCardCode = buylistImportProductCardCode;
        buylistImportProductCard.buylistImportProductCardStatus = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING;
        buylistImportProductCard.buylistImportProductCardFileURL = buylistImportProductCardFileURL;
        buylistImportProductCard.buylistImportProductCardFileOriginalName = buylistImportProductCardFile.originalname;
        buylistImportProductCard.buylistImportProductCardDate = new Date();

        buylistImportProductCard = await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCard.buylistImportProductCardId);

        if(buylistImportProductCardDTO == undefined) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_CREATION_FAILED', 'Failed to create inventory product card service import job.');
        }

        return buylistImportProductCardCode;

    }

    async createBuylistImportProductCardCode(productLineCode: string, buylistImportProductCardProviderTypeName: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let buylistImportProductCardCode = productLineCode.toUpperCase() + '-' + buylistImportProductCardProviderTypeName.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return buylistImportProductCardCode;
    
    }

    async uploadBuylistImportProductCardFile(commerceAccountId: string, buylistImportProductCardFile: Express.Multer.File, buylistImportProductCardCode: string, buylistImportProductCardProviderTypeDTO: BuylistImportProductCardProviderTypeDTO) {

        let inventoryProductCardImportJobFileBuffer = buylistImportProductCardFile.buffer;
        let inventoryProductCardImportJobBucketPath = commerceAccountId + '/' + buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath;
        let inventoryProductCardImportJobFileURL = '';

        inventoryProductCardImportJobFileURL = await this.awsS3Service.uploadCSV(inventoryProductCardImportJobFileBuffer, inventoryProductCardImportJobBucketPath, buylistImportProductCardCode);

        return inventoryProductCardImportJobFileURL;

    }

    async updateBuylistImportProductCardStatus(buylistImportProductCardId: string, buylistImportProductCardStatus: string) {
        let buylistImportProductCard = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        if(buylistImportProductCard == null || buylistImportProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
        }

        buylistImportProductCard.buylistImportProductCardStatus = buylistImportProductCardStatus;
        buylistImportProductCard.buylistImportProductCardUpdateDate = new Date();

        await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        return true;
    }

    async updateBuylistImportProductCardCount(buylistImportProductCardId: string, buylistImportProductCardCount: number, buylistImportProductCardQtyCount: number) {
        let buylistImportProductCard = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        if(buylistImportProductCard == null || buylistImportProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
        }

        buylistImportProductCard.buylistImportProductCardCount = buylistImportProductCardCount;
        buylistImportProductCard.buylistImportProductCardQtyCount = buylistImportProductCardQtyCount;
        buylistImportProductCard.buylistImportProductCardUpdateDate = new Date();

        await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        return true;
    }

    async approveBuylistImportProductCardById(buylistImportProductCardId: string) {
        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        if(buylistImportProductCardDTO == null || buylistImportProductCardDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
        }

        await this.updateBuylistImportProductCardStatus(buylistImportProductCardId, INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY);

        await this.buylistImportProductCardItemService.approveBuylistImportProductCardItemsByJobId(buylistImportProductCardDTO.buylistImportProductCardId);

        return buylistImportProductCardDTO;
    }

    async deleteBuylistImportProductCardById(buylistImportProductCardId: string) {
        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        if(buylistImportProductCardDTO == null || buylistImportProductCardDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + buylistImportProductCardId);
        }

        if(buylistImportProductCardDTO.buylistImportProductCardStatus == INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_COMPLETE) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_CANNOT_DELETE_COMPLETED', 'Cannot delete inventory product card service import job that is completed.');
        }

        await this.buylistImportProductCardItemService.deleteBuylistImportProductCardItemsByJobId(buylistImportProductCardDTO.buylistImportProductCardId);

        await this.buylistImportProductCardRepository.delete({ 
            buylistImportProductCardId: buylistImportProductCardId 
        });

        return buylistImportProductCardDTO;
    }

    /* EVENT LISTENERS */
    @OnEvent('inventory.product.card.service.import.job.update.status')
    async handleBuylistImportProductCardStatusEvent(payload: any) {

        let buylistImportProductCardId = payload.buylistImportProductCardId;
        let buylistImportProductCardStatus = payload.buylistImportProductCardStatus;

        if(buylistImportProductCardStatus == INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_UPDATE_JOB_COUNT) {
            let buylistImportProductCardCount = payload.buylistImportProductCardCount;
            let buylistImportProductCardQtyCount = payload.buylistImportProductCardQtyCount;
            await this.updateBuylistImportProductCardCount(buylistImportProductCardId, buylistImportProductCardCount, buylistImportProductCardQtyCount);
        }
        else {
            await this.updateBuylistImportProductCardStatus(buylistImportProductCardId, buylistImportProductCardStatus);
        }
    }

}