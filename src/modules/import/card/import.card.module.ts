import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportCardController } from './import.card.controller';
import { ImportCardService } from './import.card.service';
import { ImportCard } from 'src/typeorm/entities/modules/import/card/import.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportCard])
    ],
    controllers: [ImportCardController],
    providers: [ImportCardService],
    exports: [ImportCardService]
})
export class ImportCardModule {}
