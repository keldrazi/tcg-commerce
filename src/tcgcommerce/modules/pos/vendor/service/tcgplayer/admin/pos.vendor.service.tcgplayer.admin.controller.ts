import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { POSVendorServiceTCGPlayerAdminService } from './pos.vendor.service.tcgplayer.admin.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('pos/vendor/service/tcgplayer/admin')
export class POSVendorServiceTCGPlayerAdminController {

    constructor(
        private posVendorServiceTCGPlayerAdminService: POSVendorServiceTCGPlayerAdminService,
    ) { }
    
    
    @Post('/create/caid/:commerceAccountId')
    async createTCGPlayerInventoryAndPricesCSV(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.posVendorServiceTCGPlayerAdminService.createTCGPlayerInventoryAndPricesCSV(commerceAccountId);
    }
    
    @Put('/process')
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
        tcgPlayerCSVFile: Express.Multer.File,
        
    ) {

        

        return true;
    }
}