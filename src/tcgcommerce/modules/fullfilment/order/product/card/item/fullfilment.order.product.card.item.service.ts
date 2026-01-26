import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FullfilmentOrderProductCardItemDTO } from './dto/fullfilment.order.product.card.item.dto';
import { FullfilmentOrderProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/product/card/item/fullfilment.order.product.card.item.entity';

@Injectable()
export class FullfilmentOrderProductCardItemService {

    constructor(
        @InjectRepository(FullfilmentOrderProductCardItem) private fullfilmentOrderProductCardItemRepository: Repository<FullfilmentOrderProductCardItem>,
    ) { }

    async getFullfilmentOrderProductCardItemById(fullfilmentOrderProductCardItemId: string) {
        let fullfilmentOrderProductCardItem = await this.fullfilmentOrderProductCardItemRepository.findOneOrFail({ 
            where: { 
                fullfilmentOrderProductCardItemId: fullfilmentOrderProductCardItemId 
            } 
        });

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