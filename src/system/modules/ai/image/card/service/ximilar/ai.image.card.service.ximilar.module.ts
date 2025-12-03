import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AiImageCardServiceXimilarService } from "./ai.image.card.service.ximilar.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [AiImageCardServiceXimilarService],
    exports: [AiImageCardServiceXimilarService],
})

export class AiImageCardServiceXimilarModule {}