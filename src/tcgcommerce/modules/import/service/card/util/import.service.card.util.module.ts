import { Module } from '@nestjs/common';
import { ImportServiceCardUtilService } from "./import.service.card.util.service";




@Module({
  imports: [
    
  ], 
  providers: [ImportServiceCardUtilService],
  exports: [ImportServiceCardUtilService],
})
export class ImportServiceCardUtilModule {}