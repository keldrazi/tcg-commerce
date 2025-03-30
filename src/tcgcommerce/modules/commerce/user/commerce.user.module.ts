import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceUserService } from './commerce.user.service';
import { CommerceUserController } from './commerce.user.controller';
import { CommerceUser } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/commerce.user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceUser])
    ],
    controllers: [CommerceUserController],
    providers: [CommerceUserService],
    exports: [CommerceUserService]
})
export class CommerceUserModule {}
