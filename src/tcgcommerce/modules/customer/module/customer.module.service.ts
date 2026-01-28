import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerModule } from 'src/typeorm/entities/tcgcommerce/modules/customer/module/customer.module.entity';
import { CreateCustomerModuleDTO, UpdateCustomerModuleDTO, CustomerModuleDTO } from './dto/customer.module.dto';

@Injectable()
export class CustomerModuleService {

    constructor(
        @InjectRepository(CustomerModule) private customerModuleRepository: Repository<CustomerModule>,
    ) { }

    async getCustomerModuleById(customerModuleId: string): Promise<CustomerModuleDTO> {
        let customerModule = await this.customerModuleRepository.findOneOrFail({ 
            where: { 
                customerModuleId: customerModuleId
            } 
        });

        let customerModuleDTO: CustomerModuleDTO = ({ ...customerModule });

        return customerModuleDTO;
        
    }

    async getCustomerModulesByCommerceAccountId(commerceAccountId: string): Promise<CustomerModuleDTO[]> {
        let customerModules = await this.customerModuleRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId
            } 
        });

        let customerModuleDTOs: CustomerModuleDTO[] = [];

        if (!customerModules) {
            return customerModuleDTOs;
        }

        for (let i = 0; i < customerModules.length; i++) {
            let customerModule = customerModules[i];
            let customerModuleDTO: CustomerModuleDTO = ({ ...customerModule });

            customerModuleDTOs.push(customerModuleDTO);
        }

        return customerModuleDTOs;
        
    }

    async getCustomerModules(): Promise<CustomerModuleDTO[]> {
        let customerModules = await this.customerModuleRepository.find();
        
        let customerModuleDTOs: CustomerModuleDTO[] = [];

        if (!customerModules) {
            return customerModuleDTOs;
        }

        for (let i = 0; i < customerModules.length; i++) {
            let customerModule = customerModules[i];
            let customerModuleDTO: CustomerModuleDTO = ({ ...customerModule });

            customerModuleDTOs.push(customerModuleDTO);
        }

        return customerModuleDTOs;
        
    }

    async createCustomerModule(createCustomerModuleDTO: CreateCustomerModuleDTO): Promise<CustomerModuleDTO> {
        
        let customerModule = await this.customerModuleRepository.findOne({ 
            where: { 
                commerceAccountId: createCustomerModuleDTO.commerceAccountId,
                applicationModuleId: createCustomerModuleDTO.applicationModuleId
            } 
        });

        if (!customerModule) {
            throw new ConflictException('Customer module already exists');
        }
        
        customerModule = this.customerModuleRepository.create({ ...createCustomerModuleDTO });
        customerModule = await this.customerModuleRepository.save(customerModule);

        let customerModuleDTO = await this.getCustomerModuleById(customerModule.customerModuleId);

        return customerModuleDTO;
    }

    async updateCustomerModule(updateCustomerModuleDTO: UpdateCustomerModuleDTO): Promise<CustomerModuleDTO> {
            
        let customerModule = await this.customerModuleRepository.findOneOrFail({ 
            where: { 
                customerModuleId: updateCustomerModuleDTO.customerModuleId
            } 
        });

        customerModule.customerModuleSettings = updateCustomerModuleDTO.customerModuleSettings;
        customerModule.customerModuleRoles = updateCustomerModuleDTO.customerModuleRoles;
        customerModule.customerModuleIsActive = updateCustomerModuleDTO.customerModuleIsActive;
        customerModule.customerModuleUpdateDate = new Date();
        
        await this.customerModuleRepository.save(customerModule);

        let customerModuleDTO = await this.getCustomerModuleById(customerModule.customerModuleId);
        
        return customerModuleDTO;
    }

}
