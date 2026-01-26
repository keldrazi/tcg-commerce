import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountSettingsPOSVendorServiceManaPool } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.entity';
import { CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO, CommerceAccountSettingsPOSVendorServiceManaPoolDTO, UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO } from './dto/commerce.account.settings.pos.vendor.service.manapool.dto';
import { POSVendorServiceManaPoolAdminService } from 'src/tcgcommerce/modules/pos/vendor/service/manapool/admin/pos.vendor.service.manapool.admin.service';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceManaPoolService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceManaPool) private commerceAccountSettingsPOSVendorServiceManaPoolRepository: Repository<CommerceAccountSettingsPOSVendorServiceManaPool>,
        private POSVendorServiceManaPoolAdminService: POSVendorServiceManaPoolAdminService,
    ) { }

    async getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOneOrFail({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceManaPoolId : commerceAccountSettingsPOSVendorServiceManaPoolId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO: CommerceAccountSettingsPOSVendorServiceManaPoolDTO = ({ ...commerceAccountSettingsPOSVendorServiceManaPool });  
        
        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO: CommerceAccountSettingsPOSVendorServiceManaPoolDTO = ({ ...commerceAccountSettingsPOSVendorServiceManaPool });

        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
        
    }

    async createCommerceAccountSettingsPOSVendorServiceManaPool(createCommerceAccountSettingsPOSVendorServiceManaPoolDTO: CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {   
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountId, 
            } 
        });

        if(commerceAccountSettingsPOSVendorServiceManaPool != null) {
            throw new ConflictException('Commerce account settings POS vendor service Manapool already exists');
        }

        commerceAccountSettingsPOSVendorServiceManaPool = this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.create({ ...createCommerceAccountSettingsPOSVendorServiceManaPoolDTO });
        commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);

        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceManaPool(updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO: UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOneOrFail({
            where: {
                commerceAccountSettingsPOSVendorServiceManaPoolId: updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolId
            }
        });


        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate = new Date();

        commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);
        
        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
    }

    async verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountId: string) {

        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOneOrFail({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        let manaPoolAccount = await this.POSVendorServiceManaPoolAdminService.getManaPoolAccount(commerceAccountId);

        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified = true;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate = new Date();
        commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);
        
        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
    }
}