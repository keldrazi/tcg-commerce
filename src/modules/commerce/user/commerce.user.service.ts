import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceUser } from 'src/typeorm/entities/modules/commerce/user/commerce.user.entity';
import { CreateCommerceUserDTO, UpdateCommerceUserDTO, CommerceUserDTO } from './dto/commerce.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommerceUserService {

    constructor(
        @InjectRepository(CommerceUser) private commerceUserRepository: Repository<CommerceUser>,
    ) { }

    async getCommerceUser(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceUserId } });
        
        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE USER IS NULL;
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

    async getCommerceUsersByCommerceAccountId(commerceAccountId: string) {
        let commerceUsers = await this.commerceUserRepository.find({ 
            where: { 
                commerceAccountId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE USER IS NULL;
        if (commerceUsers == null) {
            return [];
        }

        let commerceUserDTOs: CommerceUserDTO[] = [];

        for(let i = 0; i < commerceUsers.length; i++) {
            let commerceUser = commerceUsers[i];
            let commerceUserDTO = new CommerceUserDTO();
            commerceUserDTO.commerceUserId = commerceUser.commerceUserId;
            commerceUserDTO.commerceUserName = commerceUser.commerceUserName;
            commerceUserDTO.commerceUserEmail = commerceUser.commerceUserEmail;
            commerceUserDTO.commerceUserRoles = commerceUser.commerceUserRoles;
            commerceUserDTO.commerceUserIsActive = commerceUser.commerceUserIsActive;
            commerceUserDTO.commerceUserCreateDate = commerceUser.commerceUserCreateDate;
            commerceUserDTO.commerceUserUpdateDate = commerceUser.commerceUserUpdateDate;

            commerceUserDTOs.push(commerceUserDTO);
        }

        return commerceUserDTOs;

    }

    async createCommerceUser(commerceUser: CreateCommerceUserDTO) {

        let commerceUserPasswordHash = await this.hashPassword(commerceUser.commerceUserPassword);
        commerceUser.commerceUserPassword = commerceUserPasswordHash;

        let newCommerceUser = this.commerceUserRepository.create({ ...commerceUser });
        newCommerceUser = await this.commerceUserRepository.save(newCommerceUser);

        let commerceUserDTO = await this.getCommerceUser(newCommerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUser(commerceUser: UpdateCommerceUserDTO) {
        let updateCommerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUser.commerceUserId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE USER IS NULL;
        if (!updateCommerceUser) {
            return null;
        }

        updateCommerceUser.commerceUserName = commerceUser.commerceUserName;
        updateCommerceUser.commerceUserEmail = commerceUser.commerceUserEmail;
        updateCommerceUser.commerceUserRoles = commerceUser.commerceUserRoles;
        updateCommerceUser.commerceUserIsActive = commerceUser.commerceUserIsActive;
        updateCommerceUser.commerceUserUpdateDate = new Date();

        updateCommerceUser = await this.commerceUserRepository.save(updateCommerceUser);

        let commerceUserDTO = new CommerceUserDTO();

        return commerceUserDTO;
    }

    async deleteCommerceUser(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE USER IS NULL;
        if (!commerceUser) {
            return null;
        }

        commerceUser.commerceUserIsActive = false;
        commerceUser.commerceUserUpdateDate = new Date();
        
        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = await this.getCommerceUser(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUserPassword(commerceUserId: string, commerceUserPassword: string) {
        let commerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE USER IS NULL;
        if (!commerceUser) {
            return null;
        }

        let commerceUserPasswordHash = await this.hashPassword(commerceUserPassword);
        commerceUser.commerceUserPassword = commerceUserPasswordHash;
        commerceUser.commerceUserUpdateDate = new Date();

        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = await this.getCommerceUser(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async hashPassword(commerceUserPassword: string){
        let commerceUserPasswordHash = await bcrypt.hash(commerceUserPassword, 10);

        return commerceUserPasswordHash;
    }

    


    
}