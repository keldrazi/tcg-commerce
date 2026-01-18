import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FullfilmentOrderProductCardItemDTO } from './dto/fullfilment.order.product.card.item.dto';
import { FullfilmentOrderProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/product/card/item/fullfilment.order.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class FullfilmentOrderProductCardItemService {

    constructor(
        @InjectRepository(FullfilmentOrderProductCardItem) private fullfilmentOrderProductCardItemRepository: Repository<FullfilmentOrderProductCardItem>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getFullfilmentOrderProductCardItemById(fullfilmentOrderProductCardItemId: string) {
        let fullfilmentOrderProductCardItem = await this.fullfilmentOrderProductCardItemRepository.findOne({ 
            where: { 
                fullfilmentOrderProductCardItemId: fullfilmentOrderProductCardItemId 
            } 
        });
        
        if (fullfilmentOrderProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_PRODUCT_CARD_ITEM_NOT_FOUND', 'Fullfilment order product card item was not found');
        }

        let fullfilmentOrderProductCardItemDTO: FullfilmentOrderProductCardItemDTO = ({ ...fullfilmentOrderProductCardItem });
        
        return fullfilmentOrderProductCardItemDTO;
        
    }

    async getFullfilmentOrderProductCardItemsByFullfilmentOrderId(fullfilmentOrderId: string) {
        let fullfilmentOrderProductCardItems = await this.fullfilmentOrderProductCardItemRepository.find({
            where: {
                fullfilmentOrderId: fullfilmentOrderId
            }
        });
        
        let fullfilmentOrderProductCardItemDTOs: FullfilmentOrderProductCardItemDTO[] = [];

        if(fullfilmentOrderProductCardItems == null) {
            return fullfilmentOrderProductCardItemDTOs;
        }
        
        for(let i = 0; i < fullfilmentOrderProductCardItems.length; i++) {
            let fullfilmentOrderProductCardItem = fullfilmentOrderProductCardItems[i];
            let fullfilmentOrderProductCardItemDTO: FullfilmentOrderProductCardItemDTO = ({ ...fullfilmentOrderProductCardItem });

            fullfilmentOrderProductCardItemDTOs.push(fullfilmentOrderProductCardItemDTO);
        }

        return fullfilmentOrderProductCardItemDTOs;
    }
}