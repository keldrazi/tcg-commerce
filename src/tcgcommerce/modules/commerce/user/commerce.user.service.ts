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

    async getCommerceUserById(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ 
            where: { 
                commerceUserId: commerceUserId
            } 
        });
        
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
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_FAILED_LOGIN', 'Commerce user login failed');
        }

        let isPasswordValid = await bcrypt.compare(commerceUserPassword, commerceUser.commerceUserPassword);

        if (!isPasswordValid) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_FAILED_LOGIN', 'Commerce user login failed');
        }

        let commerceUserDTO = await this.getCommerceUserById(commerceUser.commerceUserId);

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
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_EXISTS', 'Commerce user exists');
        }

        let commerceUserPasswordHash = await this.hashPassword(createCommerceUserDTO.commerceUserPassword);
        createCommerceUserDTO.commerceUserPassword = commerceUserPasswordHash;

        commerceUser = this.commerceUserRepository.create({ ...createCommerceUserDTO });
        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = await this.getCommerceUserById(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUser(updateCommerceUserDTO: UpdateCommerceUserDTO) {
        let commerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: updateCommerceUserDTO.commerceUserId
            }
        });
        
        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user not found');
        }

        commerceUser.commerceUserName = updateCommerceUserDTO.commerceUserName;
        commerceUser.commerceUserEmail = updateCommerceUserDTO.commerceUserEmail;
        commerceUser.commerceUserRoles = updateCommerceUserDTO.commerceUserRoles;
        commerceUser.commerceUserIsActive = updateCommerceUserDTO.commerceUserIsActive;
        commerceUser.commerceUserUpdateDate = new Date();

        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = this.getCommerceUserById(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async deleteCommerceUser(commerceUserId: string) {
        let commerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user not found');
        }

        commerceUser.commerceUserIsActive = false;
        commerceUser.commerceUserUpdateDate = new Date();
        
        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = await this.getCommerceUserById(commerceUser.commerceUserId);
        
        return commerceUserDTO;
    }

    async passwordResetCommerceUser(commerceAccountId: string, commerceUserEmail: string) {
        let commerceUser = await this.commerceUserRepository.findOne({ where: { commerceAccountId, commerceUserEmail } });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found');
        }

        await this.commerceUserVerificationService.createCommerceUserVerification(commerceAccountId, commerceUser.commerceUserId, 'COMMERCE_USER_PASSWORD_RESET');

        let commerceUserDTO = await this.getCommerceUserById(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async updateCommerceUserPassword(commerceUserId: string, commerceUserPassword: string) {
        let commerceUser = await this.commerceUserRepository.findOne({
            where: {
                commerceUserId: commerceUserId
            }
        });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found');
        }
       

        let commerceUserPasswordHash = await this.hashPassword(commerceUserPassword);
        commerceUser.commerceUserPassword = commerceUserPasswordHash;
        commerceUser.commerceUserUpdateDate = new Date();

        commerceUser = await this.commerceUserRepository.save(commerceUser);

        let commerceUserDTO = await this.getCommerceUserById(commerceUser.commerceUserId);

        return commerceUserDTO;
    }

    async verifyCommerceUserPassword(commerceAccountId: string, commerceUserId: string, commerceUserVerificationCode: string, commerceUserPassword: string) {
        let isVerified = await this.commerceUserVerificationService.verifyCommerceUserVerification(commerceAccountId, commerceUserId, commerceUserVerificationCode, 'COMMERCE_USER_PASSWORD_RESET');

        if(!isVerified) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_VERIFICATION_FAILED', 'Commerce user verification failed');
        }

        let commerceUser = await this.commerceUserRepository.findOne({ 
            where: { 
                commerceUserId: commerceUserId
            } 
        });

        if (commerceUser == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_USER_NOT_FOUND', 'Commerce user was not found');
        }

        let commerceUserDTO = await this.updateCommerceUserPassword(commerceUserId, commerceUserPassword);
        
        return commerceUserDTO;

    }

    async hashPassword(commerceUserPassword: string){
        let commerceUserPasswordHash = await bcrypt.hash(commerceUserPassword, 10);

        return commerceUserPasswordHash;
    } 
}