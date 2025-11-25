import { Controller, Post, Body, Put, Param, ParseIntPipe, Delete, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthAPIService } from 'src/system/modules/auth/api/auth.api.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';

@Controller('auth/api/token')
export class AuthAPIController {

    constructor(
        private authAPIService: AuthAPIService
    ) {}

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('request')
    authUserTokenRequest(@Request() req) {
        return this.authAPIService.loginCommerceAccount(req.commerceAccount);
    }
    

    

}