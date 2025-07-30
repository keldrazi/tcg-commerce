import { Module } from '@nestjs/common';
import { ImportServiceUtilService } from "./import.service.card.util.service";




@Module({
  imports: [
    
  ], 
  providers: [ImportServiceUtilService],
  exports: [ImportServiceUtilService],
})
export class ImportServiceUtilModule {}