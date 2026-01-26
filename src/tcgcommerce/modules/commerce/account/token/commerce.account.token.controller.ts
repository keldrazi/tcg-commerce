import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateCommerceAccountTokenDTO, UpdateCommerceAccountTokenDTO } from './dto/commerce.account.token.dto';
import { CommerceAccountTokenService } from './commerce.account.token.service';
import { Public } from 'src/system/modules/auth/api/decorators/public.decorator';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/account/token')
export class CommerceAccountTokenController {

    constructor(
        private commerceAccountTokenService: CommerceAccountTokenService,
    ) { }
    
    @Public()
    @Get('caid/:commerceAccountId')
    async getCommerceAccountTokenByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceAccountTokenService.getCommerceAccountTokenByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account token not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account token');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountToken(@Body() createCommerceAccountTokenDTO: CreateCommerceAccountTokenDTO) {
        try {
            return await this.commerceAccountTokenService.createCommerceAccountToken(createCommerceAccountTokenDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create commerce account token');
        }
    }

    @Public()
    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountToken(@Body() updateCommerceAccountTokenDTO: UpdateCommerceAccountTokenDTO) {
        try {
            return await this.commerceAccountTokenService.updateCommerceAccountToken(updateCommerceAccountTokenDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account token not found');
            }
            throw new InternalServerErrorException('Failed to update commerce account token');
        }
    }

}