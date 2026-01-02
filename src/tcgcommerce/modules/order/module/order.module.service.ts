import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModule } from 'src/typeorm/entities/tcgcommerce/modules/order/module/order.module.entity';
import { CreateOrderModuleDTO, UpdateOrderModuleDTO, OrderModuleDTO } from './dto/order.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class OrderModuleService {

    constructor(
        @InjectRepository(OrderModule) private orderModuleRepository: Repository<OrderModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getOrderModule(orderModuleId: string) {
        let orderModule = await this.orderModuleRepository.findOne({ 
            where: { 
                orderModuleId : orderModuleId
            } 
        });
        
        if (orderModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Order module was not found for orderModuleId: ' + orderModuleId);
        }

        let orderModuleDTO :OrderModuleDTO = ({ ...orderModule})

        return orderModuleDTO;
        
    }

    async getOrderModules() {
        let orderModules = await this.orderModuleRepository.find();
        
        if (orderModules == null) {
            return [];
        }

        let orderModuleDTOs: OrderModuleDTO[] = [];

        for(let i = 0; i < orderModules.length; i++) {
            let orderModule = orderModules[i];
            let orderModuleDTO :OrderModuleDTO = ({ ...orderModule})

            orderModuleDTOs.push(orderModuleDTO);

        }

        return orderModuleDTOs;
        
    }

    async createOrderModule(createOrderModuleDTO: CreateOrderModuleDTO) {
        
        let newOrderModule = this.orderModuleRepository.create({ ...createOrderModuleDTO });
        newOrderModule = await this.orderModuleRepository.save(newOrderModule);

        let orderModuleDTO = await this.getOrderModule(newOrderModule.orderModuleId);

        return orderModuleDTO;
    }

    async updateOrderModule(updateOrderModuleDTO: UpdateOrderModuleDTO) {
            
        let existingOrderModule = await this.orderModuleRepository.findOne({ 
            where: { 
                orderModuleId: updateOrderModuleDTO.orderModuleId
            } 
        });

        if (existingOrderModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Order module was not found for orderModuleId: ' + updateOrderModuleDTO.orderModuleId);
        }

        existingOrderModule.orderModuleSettings = updateOrderModuleDTO.orderModuleSettings;
        existingOrderModule.orderModuleRoles = updateOrderModuleDTO.orderModuleRoles;
        existingOrderModule.orderModuleIsActive = updateOrderModuleDTO.orderModuleIsActive;
        existingOrderModule.orderModuleUpdateDate = new Date();
        
        await this.orderModuleRepository.save(existingOrderModule);

        let orderModuleDTO = await this.getOrderModule(existingOrderModule.orderModuleId);
        
        return orderModuleDTO;
    }

}