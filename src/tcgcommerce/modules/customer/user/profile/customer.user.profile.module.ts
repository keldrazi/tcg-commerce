import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerUserProfileService } from './customer.user.profile.service';
import { CustomerUserProfileController } from './customer.user.profile.controller';
import { CustomerUserProfile } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/profile/customer.user.profile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerUserProfile]),
    ],
    controllers: [CustomerUserProfileController],
    providers: [CustomerUserProfileService],
    exports: [CustomerUserProfileService]
})
export class CustomerUserProfileModule {}
