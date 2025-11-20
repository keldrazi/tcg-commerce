import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { BuylistImportProductCardService } from './buylist.import.product.card.service';
import { BuylistImportProductCardDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/dto/buylist.import.product.card.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('inventory/product/card/service/import/job')
export class BuylistImportProductCardController {

    constructor(
        private buylistImportProductCardService: BuylistImportProductCardService,
    ) { }
    
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createBuylistImportProductCard(
        @Body() body: any,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ],
        }),
        )
        buylistImportProductCardFile: Express.Multer.File,
        
    ) {

        let buylistImportProductCardCode = await this.buylistImportProductCardService.createBuylistImportProductCard(buylistImportProductCardFile, body.createBuylistImportProductCardDTO);

        return buylistImportProductCardCode;
    }
    
    @Get('review/:buylistImportProductCardId')
    async reviewBuylistImportProductCardById(@Param('buylistImportProductCardId') buylistImportProductCardId: string) {
        let buylistImportProductCardDTO = await this.buylistImportProductCardService.getBuylistImportProductCardDetailsById(buylistImportProductCardId);

        return buylistImportProductCardDTO;
    }

    @Get('approve/:buylistImportProductCardId')
    async approveBuylistImportProductCardById(@Param('buylistImportProductCardId') buylistImportProductCardId: string) {
        let buylistImportProductCardDTO = await this.buylistImportProductCardService.approveBuylistImportProductCardById(buylistImportProductCardId);
        
        return buylistImportProductCardDTO;
    }

    @Get('delete/:buylistImportProductCardId')
    async deleteBuylistImportProductCardById(@Param('buylistImportProductCardId') buylistImportProductCardId: string) {
        let buylistImportProductCardDTO = await this.buylistImportProductCardService.deleteBuylistImportProductCardById(buylistImportProductCardId);
        
        return buylistImportProductCardDTO;
    }




    //GET ALL IMPORT JOBS FOR A COMMERCE ACCOUNT;
    //REVIEW IMPORT JOB
    //REJECT IMPORT JOB
    //APPROVE IMPORT JOB


}