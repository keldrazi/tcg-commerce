import { Module } from "@nestjs/common";
import { UtilPDFService } from "./util.pdf.service";

@Module({
  imports: [], 
  providers: [UtilPDFService],
  exports: [UtilPDFService],
})
export class UtilPDFModule {}