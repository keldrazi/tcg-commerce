import { Injectable,  } from '@nestjs/common';
import { UtilPDFService } from 'src/system/modules/util/pdf/util.pdf.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ImportSortTCGPlayerService {

    constructor(
        private utilPDFService: UtilPDFService,
        private eventEmitter: EventEmitter2,
    ) {}

    private tcgBuylistCardDataPos = {
        'tcgCardName': '1',
        'tcgCardSet': '2',
        'tcgCardCondition': '3',
        'tcgCardPrinting': '4',
        'tcgCardQty': '6',
        'tcgCardPriceLow': '7'
    }

    private tcgRowDataPos = '1';
    private tcgRowDataValue = 'Product Name';

    /*
    async updateCards(file:Express.Multer.File, totalCost:string, totalValue:string, processedBy:string, location:number, locationName:string, importJobCode:string) {

        let tcgPDFBuylistData = null;
        tcgPDFBuylistData = await this.moonshotPDFService.upload(file);

        const totalCardCost = parseFloat(totalCost);
        const totalCardValue = parseFloat(totalValue);
        
        let mtgBuylistData = null;
        mtgBuylistData = await this.processMTGPDFBuylistData(mtgPDFBuylistData, totalCardCost, totalCardValue); 
        
        console.log(mtgBuylistData);

        let cardData = [];
        for(let i = 0; i < mtgBuylistData.cardData.length; i++) {
            
            let mtgBuylistCardData = mtgBuylistData.cardData[i];
            
            let mtgBuylistCard = null;

            for(const key in mtgBuylistCardData) {
                
                let mtgBuylistCard = {
                    'mtgCardType': '',
                    'mtgCardQty': parseInt(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardQty]),
                    'mtgCardName': mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardName],
                    'mtgCardSet': mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardSet],
                    'mtgCardSetAbbv': '',
                    'mtgCardCondition': mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardCondition],
                    'mtgCardPrinting': await this.getCardPrinting(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardPrinting]),
                    'mtgCardPriceLow': parseFloat(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardPriceLow].replace('$',''))
                }   

                cardData.push(mtgBuylistCard);
            }
        }
       
        mtgBuylistData.cardData = cardData;

        console.log(mtgBuylistData);

        
        this.eventEmitter.emit(
            'moonshot.import.job.status',
            {
                importJobCode: importJobCode,
                importJobStatus: 'PROCESSING IMPORT'
            }
        )

        let jobData = await this.moonshotMTGCardImportService.importCards(mtgBuylistData, 'tcgplayer', location, locationName, this.bucketPath, processedBy, importJobCode);

        if(jobData.importJobCodeSuccess == true) {
            this.eventEmitter.emit(
                'moonshot.import.job.complete',
                {
                    importJobCode: jobData.importJobCode,
                    importJobOutputFile: jobData.importJobOutputFile,
                    importJobTotalCards: jobData.importJobTotalCards
                }
            )
        }
        else if(jobData.importJobCodeSuccess == false) {
            this.eventEmitter.emit(
                'moonshot.import.job.error',
                {
                    importJobCode: jobData.importJobCode,
                    importJobOutputFile: jobData.importJobOutputFile,
                    importJobTotalCards: jobData.importJobTotalCards
                }
            )
        }

        return jobData;
        
    }

    async processMTGPDFBuylistData(mtgPDFBuylistData: any, totalCardCost: any, totalCardValue: any) {
       
        let totalCardCount = 0;
        let totalCardPrice = 0;
        let cardData = [];
        let mtgBuylistCardData = null
        let mtgBuylistData = null;
        let pageError = false;

        //console.log(mtgPDFBuylistData);
       
        for(let i = 0; i < mtgPDFBuylistData.length; i++) {
            mtgBuylistCardData = JSON.parse(JSON.stringify(mtgPDFBuylistData[i]));
            console.log(typeof mtgBuylistCardData);
            if(typeof mtgBuylistCardData === 'object') {
                console.log(mtgBuylistCardData);
                for(const key in mtgBuylistCardData) {
                    //REMOVE THE HEADER ROW OF IF IT EXISTS;
                    if(key == '1' && mtgBuylistCardData[key][this.mtgRowDataPos] == this.mtgRowDataValue) {
                        delete mtgBuylistCardData[key];
                    }

                    else {
                        if(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardPriceLow] != undefined) {
                            let cardCount = parseInt(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardQty]);
                            let cardPrice = parseFloat(mtgBuylistCardData[key][this.mtgBuylistCardDataPos.mtgCardPriceLow].replace('$', '')) * cardCount;
                            cardPrice = parseFloat(cardPrice.toFixed(2));
                        
                            totalCardCount = totalCardCount + cardCount;
                            totalCardPrice = totalCardPrice + cardPrice;

                            
                        }
                    }
                }

                cardData.push(mtgBuylistCardData);    
            }
            else if(typeof mtgBuylistCardData === 'string') {
                pageError = true;
            }

            
            
            
        }

        let avgCardCost = parseFloat((totalCardCost / totalCardCount).toFixed(2));

        mtgBuylistData = {
            totalCardCount: totalCardCount,
            totalCardCost: totalCardCost,
            totalCardValue: totalCardValue,
            avgCardCost: avgCardCost,
            cardData: cardData,
            pageError: pageError
        }

        return mtgBuylistData;
    }

    async getCardPrinting(cardPrinting: string) {
        let cardPrintingType = "";

        if(cardPrinting.indexOf('F') != -1) {
            cardPrintingType = 'foil';
        }
        else {
            cardPrintingType = 'normal';
        }

        return cardPrintingType;
    }
        */
}


