import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCommerceAccountTokenDTO, UpdateCommerceAccountTokenDTO } from './dto/commerce.account.token.dto';
import { CommerceAccountTokenService } from './commerce.account.token.service';
import { Public } from 'src/system/modules/auth/api/decorators/public.decorator';

@Controller('commerce/account/token')
export class CommerceAccountTokenController {

    constructor(
        private commerceAccountTokenService: CommerceAccountTokenService,
    ) { }
    
    @Public()
    @Get('caid/:commerceAccountId')
    async getCommerceAccountTokenByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountTokenService.getCommerceAccountTokenByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountToken(@Body() createCommerceAccountTokenDTO: CreateCommerceAccountTokenDTO) {
        return await this.commerceAccountTokenService.createCommerceAccountToken(createCommerceAccountTokenDTO);
    }

    @Public()
    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountToken(@Body() updateCommerceAccountTokenDTO: UpdateCommerceAccountTokenDTO) {
        return await this.commerceAccountTokenService.updateCommerceAccountToken(updateCommerceAccountTokenDTO);
    }

}