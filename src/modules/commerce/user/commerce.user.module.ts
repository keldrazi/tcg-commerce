import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceUserService } from './commerce.user.service';
import { CommerceUserController } from './commerce.user.controller';

@Module({
    imports: [
        //TypeOrmModule.forFeature([TCGDatabaseUser])
    ],
    controllers: [CommerceUserController],
    providers: [CommerceUserService],
    exports: [CommerceUserService]
})
export class CommerceUserModule {}
