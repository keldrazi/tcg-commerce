import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceUser } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/commerce.user.entity';
import { CreateCommerceUserDTO, UpdateCommerceUserDTO, CommerceUserDTO } from './dto/commerce.user.dto';
import * as bcrypt from 'bcrypt';
import { CommerceUserVerificationService } from './verification/commerce.user.verification.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class CommerceUserService {

    constructor(
        @InjectRepository(CommerceUser) private commerceUserRepository: Repository<CommerceUser>,
        private commerceUserVerificationService: CommerceUserVerificationService,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getCommerceUser(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceUserId } });
        
        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for commerceUserId: ' + commerceUserId);
        }

        let commerceUserDTO:CommerceUserDTO = ({ ...commerceUser });

        return commerceUserDTO;
        
    }

    async getCommerceUsersByCommerceAccountId(commerceAccountId: string) {
        let commerceUsers = await this.commerceUserRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });

        if (commerceUsers == null) {
            return [];
        }

        let commerceUserDTOs: CommerceUserDTO[] = [];

        for(let i = 0; i < commerceUsers.length; i++) {
            let commerceUser = commerceUsers[i];
            let commerceUserDTO:CommerceUserDTO = ({ ...commerceUser });

            commerceUserDTOs.push(commerceUserDTO);
        }

        return commerceUserDTOs;

    }

    async loginCommerceUser(commerceUserEmail:string, commerceUserPassword:string) {
        let commerceUser = await this.commerceUserRepository.findOne({ 
            where: { 
                commerceUserEmail: commerceUserEmail 
            } 
        });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_INVALID_LOGIN', 'Commerce user was not found for email: ' + commerceUserEmail);
        }

        let isPasswordValid = await bcrypt.compare(commerceUserPassword, commerceUser.commerceUserPassword);

        if (!isPasswordValid) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_INVALID_LOGIN', 'Commerce user login is invalid for email: ' + commerceUserEmail);
        }

        let commerceUserDTO = await this.getCommerceUser(commerceUser.commerceUserId);

        return commerceUserDTO;

    }

    async createCommerceUser(createCommerceUserDTO: CreateCommerceUserDTO) {
        let commerceUser = await this.commerceUserRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceUserDTO.commerceAccountId,
                commerceUserEmail: createCommerceUserDTO.commerceUserEmail
            } 
        });

        if (commerceUser != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_EXISTS', 'Commerce user with email already exists: ' + createCommerceUserDTO.commerceUserEmail);
        }

        let commerceUserPasswordHash = await this.hashPassword(createCommerceUserDTO.commerceUserPassword);
        createCommerceUserDTO.commerceUserPassword = commerceUserPasswordHash;

        let newCommerceUser = this.commerceUserRepository.create({ ...createCommerceUserDTO });
        newCommerceUser = await this.commerceUserRepository.save(newCommerceUser);

        let commerceUserDTO = await this.getCommerceUser(newCommerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUser(updateCommerceUserDTO: UpdateCommerceUserDTO) {
        let updateCommerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: updateCommerceUserDTO.commerceUserId
            }
        });
        
        if (updateCommerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for commerceUserId: ' + updateCommerceUserDTO.commerceUserId);
        }

        let existingCommerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceAccountId: updateCommerceUserDTO.commerceAccountId,
                commerceUserEmail: updateCommerceUserDTO.commerceUserEmail
            }
        });

        if(existingCommerceUser != null && existingCommerceUser.commerceUserId !== updateCommerceUserDTO.commerceUserId) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_EXISTS', 'Commerce user with email already exists: ' + updateCommerceUserDTO.commerceUserEmail);
        }

        updateCommerceUser.commerceUserName = updateCommerceUserDTO.commerceUserName;
        updateCommerceUser.commerceUserEmail = updateCommerceUserDTO.commerceUserEmail;
        updateCommerceUser.commerceUserRoles = updateCommerceUserDTO.commerceUserRoles;
        updateCommerceUser.commerceUserIsActive = updateCommerceUserDTO.commerceUserIsActive;
        updateCommerceUser.commerceUserUpdateDate = new Date();

        updateCommerceUser = await this.commerceUserRepository.save(updateCommerceUser);

        let commerceUserDTO = this.getCommerceUser(updateCommerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async deleteCommerceUser(commerceUserId: string) {
        let deleteCommerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        if (deleteCommerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for commerceUserId: ' + commerceUserId);
        }

        deleteCommerceUser.commerceUserIsActive = false;
        deleteCommerceUser.commerceUserUpdateDate = new Date();
        
        deleteCommerceUser = await this.commerceUserRepository.save(deleteCommerceUser);

        let commerceUserDTO = await this.getCommerceUser(deleteCommerceUser.commerceUserId);
        
        return commerceUserDTO;
    }

    async passwordResetCommerceUser(commerceAccountId: string, commerceUserEmail: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceAccountId, commerceUserEmail } });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for email: ' + commerceUserEmail);
        }

        await this.commerceUserVerificationService.createCommerceUserVerification(commerceAccountId, commerceUser.commerceUserId, 'COMMERCE_USER_PASSWORD_RESET');

        let commerceUserDTO = await this.getCommerceUser(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUserPassword(commerceUserId: string, commerceUserPassword: string) {
        let updateCommerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        if (updateCommerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for commerceUserId: ' + commerceUserId);
        }
       

        let commerceUserPasswordHash = await this.hashPassword(commerceUserPassword);
        updateCommerceUser.commerceUserPassword = commerceUserPasswordHash;
        updateCommerceUser.commerceUserUpdateDate = new Date();

        updateCommerceUser = await this.commerceUserRepository.save(updateCommerceUser);

        let commerceUserDTO = await this.getCommerceUser(updateCommerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async verifyCommerceUserPassword(commerceAccountId: string, commerceUserId: string, commerceUserVerificationCode: number, commerceUserPassword: string) {
        let isVerified = await this.commerceUserVerificationService.verifyCommerceUserVerification(commerceAccountId, commerceUserId, commerceUserVerificationCode, 'COMMERCE_USER_PASSWORD_RESET');

        if(!isVerified) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_VERIFICATION_FAILED', 'Commerce user verification failed for commerceUserId: ' + commerceUserId);
        }

        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceUserId } });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found for commerceUserId: ' + commerceUserId);
        }

        let commerceUserDTO = await this.updateCommerceUserPassword(commerceUserId, commerceUserPassword);
        
        return commerceUserDTO;

    }



    async hashPassword(commerceUserPassword: string){
        let commerceUserPasswordHash = await bcrypt.hash(commerceUserPassword, 10);

        return commerceUserPasswordHash;
    }

    


    
}