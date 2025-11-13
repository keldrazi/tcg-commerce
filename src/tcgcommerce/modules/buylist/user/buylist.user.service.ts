import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistUser } from 'src/typeorm/entities/tcgcommerce/modules/buylist/user/buylist.user.entity';
import { CreateBuylistUserDTO, UpdateBuylistUserDTO, BuylistUserDTO } from './dto/buylist.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BuylistUserService {

    constructor(
        @InjectRepository(BuylistUser) private buylistUserRepository: Repository<BuylistUser>,
    ) { }

    async getBuylistUserById(buylistUserId: string) {
        let buylistUser = await this.buylistUserRepository.findOne({ where: { buylistUserId } });
        
        //TO DO: CREATE AN ERROR TO RETURN IF BUYLIST USER IS NULL;
        if (buylistUser == null) {
            return null;
        }

        let buylistUserDTO:BuylistUserDTO = ({ ...buylistUser });

        return buylistUserDTO;
        
    }

    async getBuylistUsersByCommerceAccountId(commerceAccountId: string) {
        let buylistUsers = await this.buylistUserRepository.find({ 
            where: { 
                commerceAccountId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN IF BUYLIST USER IS NULL;
        if (buylistUsers == null) {
            return [];
        }

        let buylistUserDTOs: BuylistUserDTO[] = [];

        for(let i = 0; i < buylistUsers.length; i++) {
            let buylistUser = buylistUsers[i];
            let buylistUserDTO:BuylistUserDTO = ({ ...buylistUser });

            buylistUserDTOs.push(buylistUserDTO);
        }

        return buylistUserDTOs;

    }

    async createBuylistUser(buylistUser: CreateBuylistUserDTO) {

        let buylistUserPasswordHash = await this.hashPassword(buylistUser.buylistUserPassword);
        buylistUser.buylistUserPassword = buylistUserPasswordHash;

        let newBuylistUser = this.buylistUserRepository.create({ ...buylistUser });
        newBuylistUser = await this.buylistUserRepository.save(newBuylistUser);

        let buylistUserDTO = await this.getBuylistUserById(newBuylistUser.buylistUserId);

        return buylistUserDTO;
    }

    async updateBuylistUser(buylistUser: UpdateBuylistUserDTO) {
        let updateBuylistUser = await this.getBuylistUserById(buylistUser.buylistUserId);
        
        //TO DO: CREATE AN ERROR TO RETURN IF BUYLIST USER IS NULL;
        if (updateBuylistUser == null) {
            return null;
        }

        updateBuylistUser.buylistUserFirstName = buylistUser.buylistUserFirstName;
        updateBuylistUser.buylistUserLastName = buylistUser.buylistUserLastName;
        updateBuylistUser.buylistUserEmail = buylistUser.buylistUserEmail;
        updateBuylistUser.buylistUserAddress1 = buylistUser.buylistUserAddress1;
        updateBuylistUser.buylistUserAddress2 = buylistUser.buylistUserAddress2;
        updateBuylistUser.buylistUserCity = buylistUser.buylistUserCity;
        updateBuylistUser.buylistUserState = buylistUser.buylistUserState;
        updateBuylistUser.buylistUserZipCode = buylistUser.buylistUserZipCode;
        updateBuylistUser.buylistUserIsActive = buylistUser.buylistUserIsActive;
        updateBuylistUser.buylistUserUpdateDate = new Date();

        updateBuylistUser = await this.buylistUserRepository.save(updateBuylistUser);

        let buylistUserDTO = await this.getBuylistUserById(updateBuylistUser.buylistUserId);

        return buylistUserDTO;
    }

    async deleteBuylistUser(buylistUserId: string) {
        let buylistUser = await this.getBuylistUserById(buylistUserId);

        //TO DO: CREATE AN ERROR TO RETURN IF BUYLIST USER IS NULL;
        if (buylistUser == null) {
            return null;
        }

        buylistUser.buylistUserIsActive = false;
        buylistUser.buylistUserUpdateDate = new Date();
        
        buylistUser = await this.buylistUserRepository.save(buylistUser);

        let buylistUserDTO = await this.getBuylistUserById(buylistUser.buylistUserId);

        return buylistUserDTO;
    }

    async updateBuylistUserPassword(buylistUserId: string, buylistUserPassword: string) {
        let buylistUser = await this.buylistUserRepository.findOne({
            where: {
                buylistUserId: buylistUserId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN IF BUYLIST USER IS NULL;
        if (buylistUser == null) {
            return null;
        }

        let buylistUserPasswordHash = await this.hashPassword(buylistUserPassword);
        buylistUser.buylistUserPassword = buylistUserPasswordHash;
        buylistUser.buylistUserUpdateDate = new Date();

        buylistUser = await this.buylistUserRepository.save(buylistUser);

        let buylistUserDTO = await this.getBuylistUserById(buylistUser.buylistUserId);

        return buylistUserDTO;
    }

    async hashPassword(buylistUserPassword: string){
        let buylistUserPasswordHash = await bcrypt.hash(buylistUserPassword, 10);

        return buylistUserPasswordHash;
    }

    


    
}