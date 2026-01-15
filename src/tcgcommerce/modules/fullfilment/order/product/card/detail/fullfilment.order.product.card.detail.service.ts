import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FullfilmentOrderDTO } from './dto/fullfilment.order.dto';
import { FullfilmentOrder } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/fullfilment.order.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class FullfilmentOrderService {

    constructor(
        @InjectRepository(FullfilmentOrder) private fullfilmentOrderRepository: Repository<FullfilmentOrder>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getFullfilmentOrderById(fullfilmentOrderId: string) {
        let fullfilmentOrder = await this.fullfilmentOrderRepository.findOne({ 
            where: { 
                fullfilmentOrderId: fullfilmentOrderId 
            } 
        });
        
        if (fullfilmentOrder == null) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_NOT_FOUND', 'Fullfilment order type was not found');
        }

        let fullfilmentOrderDTO: FullfilmentOrderDTO = ({ ...fullfilmentOrder });

        return fullfilmentOrderDTO;
        
    }

    async getFullfilmentOrdersByCommerceAccountId(commerceAccountId: string) {
        let fullfilmentOrders = await this.fullfilmentOrderRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        let fullfilmentOrderDTOs: FullfilmentOrderDTO[] = [];

        if(fullfilmentOrders == null) {
            return fullfilmentOrderDTOs;
        }
        
        for(let i = 0; i < fullfilmentOrders.length; i++) {
            let fullfilmentOrder = fullfilmentOrders[i];
            let fullfilmentOrderDTO: FullfilmentOrderDTO = ({ ...fullfilmentOrder });

            fullfilmentOrderDTOs.push(fullfilmentOrderDTO);
        }

        return fullfilmentOrderDTOs;
    }
}