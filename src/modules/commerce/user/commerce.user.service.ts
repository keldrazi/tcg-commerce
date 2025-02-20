import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceUser } from 'src/typeorm/entities/modules/commerce/user/commerce.user.entity';
import { CreateCommerceUserDTO, CommerceUserDTO } from './dto/commerce.user.dto';

@Injectable()
export class CommerceUserService {

    constructor(
        @InjectRepository(CommerceUser) private commerceUserRepository: Repository<CommerceUser>,
    ) { }

    async getCommerceUser(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceUserId } });
        
        if (!commerceUser) {
            return null;
        }

        let commerceUserDTO = new CommerceUserDTO();
        commerceUserDTO.commerceUserId = commerceUser.commerceUserId;
        commerceUserDTO.commerceUserName = commerceUser.commerceUserName;
        commerceUserDTO.commerceUserEmail = commerceUser.commerceUserEmail;
        commerceUserDTO.commerceUserRoles = commerceUser.commerceUserRoles;
        commerceUserDTO.commerceUserIsActive = commerceUser.commerceUserIsActive;
        commerceUserDTO.commerceUserCreateDate = commerceUser.commerceUserCreateDate;
        commerceUserDTO.commerceUserUpdateDate = commerceUser.commerceUserUpdateDate;

        return commerceUserDTO;
        
    }

    async createCommerceUser(commerceUser: CreateCommerceUserDTO) {
        let newCommerceUser = this.commerceUserRepository.create({ ...commerceUser });
        newCommerceUser = await this.commerceUserRepository.save(newCommerceUser);

        let commerceUserDTO = new CommerceUserDTO();
        commerceUserDTO.commerceUserId = newCommerceUser.commerceUserId;
        commerceUserDTO.commerceUserName = newCommerceUser.commerceUserName;
        commerceUserDTO.commerceUserEmail = newCommerceUser.commerceUserEmail;
        commerceUserDTO.commerceUserRoles = commerceUser.commerceUserRoles;
        commerceUserDTO.commerceUserIsActive = newCommerceUser.commerceUserIsActive;
        commerceUserDTO.commerceUserCreateDate = newCommerceUser.commerceUserCreateDate;
        commerceUserDTO.commerceUserUpdateDate = newCommerceUser.commerceUserUpdateDate;

        return commerceUserDTO;
    }
    
}