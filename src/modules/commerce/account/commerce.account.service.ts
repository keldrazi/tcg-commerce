import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommerceAccountService {

    constructor(
        //@InjectRepository(TCGDatabaseUser) private tcgDatabaseUserRepository: Repository<TCGDatabaseUser>,
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