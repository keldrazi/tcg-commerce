import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGConditionDTO } from './dto/tcgdb.mtg.condition.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGConditionService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGConditions() {
        
        let tcgdbMTGConditionDTOs: TCGdbMTGConditionDTO[] = [];

        //GET ALL TCGDB CONDITIONS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/mtg/set/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGCondition = data[i];
            
            let tcgdbMTGConditionDTO: TCGdbMTGConditionDTO = ({ ...tcgdbMTGCondition });

            tcgdbMTGConditionDTOs.push(tcgdbMTGConditionDTO);
        }

        return tcgdbMTGConditionDTOs;
    }

    /*

    async getTCGdbMTGConditionByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGCondition = await this.tcgdbMTGConditionRepository.findOne({
            where: {
                tcgdbMTGConditionTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbMTGCondition == null) {
            return null;
        }

        let tcgdbMTGConditionDTO: TCGdbMTGConditionDTO = ({ ...tcgdbMTGCondition });

        return tcgdbMTGConditionDTO;
    }

    async createTCGdbMTGConditions() {
        
        let tcgdbMTGConditionRecordCount = 0;

        let tcgPlayerMTGConditions = await this.tcgPlayerMTGConditionService.getTCGPlayerMTGConditions();

        for(let i=0; i < tcgPlayerMTGConditions.length; i++) {
            let tcgPlayerMTGCondition = tcgPlayerMTGConditions[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGCondition = await this.getTCGdbMTGConditionByTCGPlayerId(tcgPlayerMTGCondition.tcgPlayerMTGConditionId);
            let tcgdbMTGConditionPriceFactor = 1;

            switch(tcgPlayerMTGCondition.tcgPlayerMTGConditionCode) {
                case 'NM':
                    tcgdbMTGConditionPriceFactor = 1;
                    break;
                case 'LP':
                    tcgdbMTGConditionPriceFactor = 0.9;
                    break;
                case 'MP':
                    tcgdbMTGConditionPriceFactor = 0.8;
                    break;
                case 'HP':
                    tcgdbMTGConditionPriceFactor = 0.6;
                    break;
                case 'DM':
                    tcgdbMTGConditionPriceFactor = 0.5;
                    break;

            }
            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGCondition == null) {
                const newTCGdgMTGCondition = this.tcgdbMTGConditionRepository.create({
                    tcgdbMTGConditionTCGPlayerId: tcgPlayerMTGCondition.tcgPlayerMTGConditionId,
                    tcgdbMTGConditionName: tcgPlayerMTGCondition.tcgPlayerMTGConditionName,
                    tcgdbMTGConditionCode: tcgPlayerMTGCondition.tcgPlayerMTGConditionCode,
                    tcgdbMTGConditionPriceFactor: tcgdbMTGConditionPriceFactor,
                    tcgdbMTGConditionDisplayOrder: tcgPlayerMTGCondition.tcgPlayerMTGConditionDisplayOrder,
                });

                await this.tcgdbMTGConditionRepository.save(newTCGdgMTGCondition);

                tcgdbMTGConditionRecordCount++;
            }
        }

        return tcgdbMTGConditionRecordCount;

    }
    */
}


