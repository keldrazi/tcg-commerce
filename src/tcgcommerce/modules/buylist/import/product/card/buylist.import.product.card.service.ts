import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistImportProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.entity';
import { CreateBuylistImportProductCardDTO, BuylistImportProductCardDTO } from './dto/buylist.import.product.card.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { BuylistImportProductCardItemService } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.service';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';
import { BuylistImportProductCardProviderTypeService } from './provider/type/buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeDTO } from './provider/type/dto/buylist.import.product.card.provider.type.dto';
import { BuylistProductCardService } from 'src/tcgcommerce/modules/buylist/product/card/buylist.product.card.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BuylistImportProductCardService {

    constructor(
        @InjectRepository(BuylistImportProductCard) private buylistImportProductCardRepository: Repository<BuylistImportProductCard>,
        private buylistImportProductCardItemService: BuylistImportProductCardItemService,
        private awsS3Service: AwsS3Service,
        private buylistImportProductCardProviderTypeService: BuylistImportProductCardProviderTypeService,
        private buylistProductCardService: BuylistProductCardService,
        private productLineService: ProductLineService,
        private eventEmitter: EventEmitter2,
    ) { }

    async getBuylistImportProductCardById(buylistImportProductCardId: string): Promise<BuylistImportProductCardDTO> {
        let buylistImportProductCard = await this.buylistImportProductCardRepository.findOne({
            where: {
                buylistImportProductCardId: buylistImportProductCardId
            }
        });

        if(buylistImportProductCard == null) {
            throw new NotFoundException('Buylist import product card not found');
        }

        let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard });

        return buylistImportProductCardDTO;

    }

    
    async getBuylistImportProductCardsByBuylistId(buylistProductCardId: string): Promise<BuylistImportProductCardDTO[]> {

        let buylistImportProductCardDTOs: BuylistImportProductCardDTO[] = [];

        let buylistImportProductCards = await this.buylistImportProductCardRepository.find({
            where: {
                buylistProductCardId: buylistProductCardId
            }
        });

        if(buylistImportProductCards == null) {
            return buylistImportProductCardDTOs;
        }

        
        for(let i = 0; i < buylistImportProductCards.length; i++) {
            let buylistImportProductCard = buylistImportProductCards[i];
            let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});

            buylistImportProductCardDTOs.push(buylistImportProductCardDTO);
        }

        return buylistImportProductCardDTOs;
    }

    async getBuylistImportProductCardDetailsById(buylistImportProductCardId: string): Promise<{ buylistImportProductCardDTO: BuylistImportProductCardDTO; buylistImportProductCardItemDTOs: any }> {
        let buylistImportProductCard = await this.buylistImportProductCardRepository.findOne({
            where: {
                buylistImportProductCardId: buylistImportProductCardId
            }
        });

        if(buylistImportProductCard == null) {
            throw new NotFoundException('Buylist import product card not found');
        }

        //MAP TO DTO;
        let buylistImportProductCardDTO: BuylistImportProductCardDTO = ({ ...buylistImportProductCard});
        let buylistImportProductCardItemDTOs = await this.buylistImportProductCardItemService.getBuylistImportProductCardItemsByBuylistId(buylistImportProductCardDTO.buylistImportProductCardId);

        if(buylistImportProductCardItemDTOs == null) {
            throw new NotFoundException('Buylist import product card details not found');
        }

        let buylistImportProductCardDetails = {
            buylistImportProductCardDTO,
            buylistImportProductCardItemDTOs
        };

        return buylistImportProductCardDetails;

    }
    
    async getBuylistImportProductCardByOriginalFileName(buylistProductCardId: string, buylistImportProductCardFileOriginalName: string): Promise<BuylistImportProductCard | null> {
        return await this.buylistImportProductCardRepository.findOne({
            where: { 
                buylistProductCardId: buylistProductCardId,
                buylistImportProductCardFileOriginalName: buylistImportProductCardFileOriginalName 
            }
        });
    }

    async createBuylistImportProductCard(buylistImportProductCardFile: Express.Multer.File, createBuylistImportProductCardDTO: CreateBuylistImportProductCardDTO): Promise<string> {

        //CHECK TO SEE IF A FILE WITH THE SAME NAME EXISTS;
        let existingImportJobCard = await this.getBuylistImportProductCardByOriginalFileName(createBuylistImportProductCardDTO.buylistProductCardId, buylistImportProductCardFile.originalname);

        if(existingImportJobCard != null) {
            throw new ConflictException('A buylist import job with the same file name already exists. Please rename the file and try again.');
        }

        let buylistImportProductCardProviderTypeDTO = await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypeByName(createBuylistImportProductCardDTO.buylistImportProductCardProviderTypeName);

        if(buylistImportProductCardProviderTypeDTO == null) {
            throw new NotFoundException('Buylist import product card service provider type not found');
        }

        let buylistProductCardDTO = await this.buylistProductCardService.getBuylistProductCardById(createBuylistImportProductCardDTO.buylistProductCardId);

        if(buylistProductCardDTO == null) {
            throw new NotFoundException('Buylist product card not found');
        }

        let productLineDTO = await this.productLineService.getProductLineById(buylistProductCardDTO.productLineId);

        if(productLineDTO == null) {
            throw new NotFoundException('Product line not found');
        }


        let buylistImportProductCardCode = await this.createBuylistImportProductCardCode(productLineDTO.productLineCode, createBuylistImportProductCardDTO.buylistImportProductCardProviderTypeName);

        //UPLOAD THE FILE TO S3
        let buylistImportProductCardFileURL = await this.uploadBuylistImportProductCardFile(buylistProductCardDTO.commerceAccountId, buylistImportProductCardFile, buylistImportProductCardCode, buylistImportProductCardProviderTypeDTO);

        let buylistImportProductCard = this.buylistImportProductCardRepository.create({ ...createBuylistImportProductCardDTO });
        buylistImportProductCard.buylistImportProductCardCode = buylistImportProductCardCode;
        buylistImportProductCard.buylistImportProductCardStatus = 'PENDING APPROVAL';
        buylistImportProductCard.buylistImportProductCardFileURL = buylistImportProductCardFileURL;
        buylistImportProductCard.buylistImportProductCardFileOriginalName = buylistImportProductCardFile.originalname;
        buylistImportProductCard.buylistImportProductCardDate = new Date();

        buylistImportProductCard = await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCard.buylistImportProductCardId);

        if(buylistImportProductCardDTO == undefined) {
            throw new ConflictException('Failed to create buylist import product card.');
        }

        return buylistImportProductCardCode;

    }

    async createBuylistImportProductCardCode(productLineCode: string, buylistImportProductCardProviderTypeName: string): Promise<string> {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let buylistImportProductCardCode = productLineCode.toUpperCase() + '-' + buylistImportProductCardProviderTypeName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return buylistImportProductCardCode;
    
    }

    async uploadBuylistImportProductCardFile(commerceAccountId: string, buylistImportProductCardFile: Express.Multer.File, buylistImportProductCardCode: string, buylistImportProductCardProviderTypeDTO: BuylistImportProductCardProviderTypeDTO): Promise<string> {

        let buylistImportProductCardFileBuffer = buylistImportProductCardFile.buffer;
        let buylistImportProductCardBucketPath = commerceAccountId + '/' + buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath;
        let buylistImportProductCardFileURL = '';

        buylistImportProductCardFileURL = await this.awsS3Service.uploadCSV(buylistImportProductCardFileBuffer, buylistImportProductCardBucketPath, buylistImportProductCardCode);

        return buylistImportProductCardFileURL;
    }

    
    async updateBuylistImportProductCardStatus(buylistImportProductCardId: string, buylistImportProductCardStatus: string): Promise<boolean> {
        let buylistImportProductCard = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        buylistImportProductCard.buylistImportProductCardStatus = buylistImportProductCardStatus;
        buylistImportProductCard.buylistImportProductCardUpdateDate = new Date();

        await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        return true;
    }
    
    async approveBuylistImportProductCardById(buylistImportProductCardId: string): Promise<BuylistImportProductCardDTO> {
        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        await this.updateBuylistImportProductCardStatus(buylistImportProductCardId, 'APPROVED');

        this.eventEmitter.emit('buylist.import.product.card.approved', {
            buylistImportProductCardId: buylistImportProductCardId,
        });

        return buylistImportProductCardDTO;
    }

    async deleteBuylistImportProductCardById(buylistImportProductCardId: string): Promise<BuylistImportProductCardDTO> {
        let buylistImportProductCardDTO = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        if(buylistImportProductCardDTO.buylistImportProductCardStatus == 'APPROVED') {
            throw new ConflictException('Cannot delete buylist import product card that is approved.');
        }

        await this.buylistImportProductCardItemService.deleteBuylistImportProductCardItemsByJobId(buylistImportProductCardDTO.buylistImportProductCardId);

        await this.buylistImportProductCardRepository.delete({ 
            buylistImportProductCardId: buylistImportProductCardId 
        });

        return buylistImportProductCardDTO;
    }

    async updateBuylistImportProductCardCount(buylistImportProductCardId: string, buylistImportProductCardCount: number, buylistImportProductCardQtyCount: number): Promise<boolean> {
        let buylistImportProductCard = await this.getBuylistImportProductCardById(buylistImportProductCardId);

        buylistImportProductCard.buylistImportProductCardCount = buylistImportProductCardCount;
        buylistImportProductCard.buylistImportProductCardQtyCount = buylistImportProductCardQtyCount;
        buylistImportProductCard.buylistImportProductCardUpdateDate = new Date();

        await this.buylistImportProductCardRepository.save(buylistImportProductCard);

        return true;
    }

    /* EVENT LISTENERS */
    @OnEvent('buylist.import.product.card.update.count')
    async handleBuylistImportProductCardStatusEvent(payload: any): Promise<void> {

        let buylistImportProductCardId = payload.buylistImportProductCardId;
        let buylistImportProductCardCount = payload.buylistImportProductCardCount;
        let buylistImportProductCardQtyCount = payload.buylistImportProductCardQtyCount;
        
        await this.updateBuylistImportProductCardCount(buylistImportProductCardId, buylistImportProductCardCount, buylistImportProductCardQtyCount);

    }

}