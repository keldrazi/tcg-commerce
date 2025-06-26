import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImportProcessService } from './import.process.service';

@Controller('import/process')
export class ImportProcessController {

    constructor(
        private importProcessService: ImportProcessService,
    ) { }
    
   
}