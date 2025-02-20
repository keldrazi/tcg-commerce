import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';



@Controller('commerce/user')
export class CommerceUserController {

    constructor() { }
    
    /*
    @Post()
    createUser(@Body() tcgDatabaseUserCreateDTO: TCGDatabaseUserCreateDTO) {
        return this.tcgDatabaseUserService.createTCGDatbaseUser(tcgDatabaseUserCreateDTO);
    }

    @Put(':id')
    async updateUser(@Param('tcgDatabaseUserId') tcgDatabaseUserId: string, @Body() tcgDatabaseUserUpdateDTO: TCGDatabaseUserUpdateDTO) {
        await this.tcgDatabaseUserService.updateTCGDatabaseUser(tcgDatabaseUserId, tcgDatabaseUserUpdateDTO);
    }
    */

}