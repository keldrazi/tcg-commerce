import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryLoadJobCardService } from './inventory.load.job.card.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('inventory/job/card')
export class InventoryLoadJobCardController {

    constructor(
        private inventoryLoadJobCardService: InventoryLoadJobCardService,
    ) { }
    
    @Post()
    async createInventoryLoadJobCard(@Body() body: any)
    {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.createInventoryLoadJobCard(body.createInventoryLoadJobCardDTO);
        
        return inventoryLoadJobCardDTO;
    }

       
}