import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountToken } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/token/commerce.account.token.entity';
import { CreateCommerceAccountTokenDTO, UpdateCommerceAccountTokenDTO, CommerceAccountTokenDTO } from './dto/commerce.account.token.dto';

@Injectable()
export class CommerceAccountTokenService {
    constructor(
        @InjectRepository(CommerceAccountToken) private commerceAccountTokenRepository: Repository<CommerceAccountToken>,
    ) { }


    async getCommerceAccountTokenByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountToken = await this.commerceAccountTokenRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });

        let commerceAccountTokenDTO: CommerceAccountTokenDTO = ({ ...commerceAccountToken });
        
        return commerceAccountTokenDTO;
        
    }

    async createCommerceAccountToken(createCommerceAccountTokenDTO: CreateCommerceAccountTokenDTO) {

        let commerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        if (commerceAccountToken != null) {
            throw new ConflictException('Commerce account token already exists');
        }

        commerceAccountToken = this.commerceAccountTokenRepository.create({
            commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId,
            commerceAccountToken: createCommerceAccountTokenDTO.commerceAccountToken,
            commerceAccountTokenIssued: createCommerceAccountTokenDTO.commerceAccountTokenIssued,
            commerceAccountTokenExpires: createCommerceAccountTokenDTO.commerceAccountTokenExpires,
        });

        commerceAccountToken =  await this.commerceAccountTokenRepository.save(commerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountTokenByCommerceAccountId(commerceAccountToken.commerceAccountId);

        return commerceAccountTokenDTO;
    }

    async updateCommerceAccountToken(updateCommerceAccountTokenDTO: UpdateCommerceAccountTokenDTO) {
        let commerceAccountToken = await this.commerceAccountTokenRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: updateCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        commerceAccountToken.commerceAccountTokenId = updateCommerceAccountTokenDTO.commerceAccountTokenId;
        commerceAccountToken.commerceAccountId = updateCommerceAccountTokenDTO.commerceAccountId;
        commerceAccountToken.commerceAccountToken = updateCommerceAccountTokenDTO.commerceAccountToken;
        commerceAccountToken.commerceAccountTokenIssued = updateCommerceAccountTokenDTO.commerceAccountTokenIssued;
        commerceAccountToken.commerceAccountTokenExpires = updateCommerceAccountTokenDTO.commerceAccountTokenExpires;
        commerceAccountToken.commerceAccountTokenUpdateDate = new Date();

        commerceAccountToken = await this.commerceAccountTokenRepository.save(commerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountTokenByCommerceAccountId(commerceAccountToken.commerceAccountId);
        
        return commerceAccountTokenDTO;
    }
}