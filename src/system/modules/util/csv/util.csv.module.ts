import { Module } from "@nestjs/common";
import { UtilCSVService } from "./util.csv.service";


@Module({
  imports: [], 
  providers: [UtilCSVService],
  exports: [UtilCSVService],
})
export class UtilCSVModule {}