import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { AiImageCardServiceXimilarDTO } from './dto/ai.image.card.service.ximilar.dto';
import { PRODUCT_LINE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class AiImageCardServiceXimilarService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}
    

    async analyzeCardImage(imageBase64: string, cardPrinting: string, cardType: string) {
        const ximilarAPIURL = this.configService.get('XIMILAR_API_URL');
        const ximilarAccessToken = this.configService.get('XIMILAR_ACCESS_TOKEN');

        let subcategory = '';
        switch(cardType) {
            case PRODUCT_LINE_CODE.MAGIC_THE_GATHERING:
                subcategory = "Magic The Gathering";
                break;
            case PRODUCT_LINE_CODE.POKEMON:
                subcategory = "Pokemon";
                break;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + ximilarAccessToken,
        };

        const body = {
            "records": [
                {
                    "_base64": imageBase64,
                    "Top Category": "Card",
                    "Side": "front",
                    "Alphabet": "latin",
                    "Category": "Card/Trading Card Game",
                    "Subcategory": subcategory,
                    "Foil/Holo": cardPrinting,
                    "Rotation": "rotation_ok",
                    "Graded": "no"
                }
            ]
        };
        
        console.time('Ximilar Request');
        const response = this.httpService.post(ximilarAPIURL, body, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new InternalServerErrorException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        console.timeEnd('Ximilar Request');
        let cardData = data?.records?.[0]?._objects?.[0]?._identification?.best_match || null;

        if(cardData) {
            let aiImageCardServiceXimilarDTO: AiImageCardServiceXimilarDTO = {
                aiImageCardServiceXimilarCardNumber: cardData.card_number || '',
                aiImageCardServiceXimilarCardNumberOutOf: cardData.out_of || '',
                aiImageCardServiceXimilarCardName: cardData.name || '',
                aiImageCardServiceXimilarSetCode: cardData.set_code || '',
                aiImageCardServiceXimilarSetSeriesCode: cardData.set_series_code || '',
                aiImageCardServiceXimilarSetName: cardData.set || '',
            };

            return aiImageCardServiceXimilarDTO;
        }
        else {
            throw new NotFoundException('Card not found by Ximilar AI Image Analysis');
        }
    }
}


