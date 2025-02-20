import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';

@Injectable()
export class CommerceAccountService {

    constructor(
        @InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
    ) { }

    /*
    getTCGDatabaseUsers() {
        return this.tcgDatabaseUserRepository.find();
    }

    getTCGDatabaseUser(tcgDatabaseUserEmail: string): Promise<TCGDatabaseUser> {
        return this.tcgDatabaseUserRepository.findOne({
            where: {tcgDatabaseUserEmail: tcgDatabaseUserEmail}})
    }

    createTCGDatbaseUser(tcgDatabaseUser: TCGDatabaseUserCreateParams) {
        const newTCGDatabaseUser = this.tcgDatabaseUserRepository.create({ ...tcgDatabaseUser});
        return this.tcgDatabaseUserRepository.save(newTCGDatabaseUser);
    }

    updateTCGDatabaseUser(tcgDatabaseUserId: string, tcgDatabaseUser: TCGDatabaseUserUpdateParams) {
        return this.tcgDatabaseUserRepository.update({ tcgDatabaseUserId }, { ...tcgDatabaseUser });
    }

    deleteUser(tcgDatabaseUserId: string) {
        return this.tcgDatabaseUserRepository.delete(tcgDatabaseUserId);
    }
    */
}