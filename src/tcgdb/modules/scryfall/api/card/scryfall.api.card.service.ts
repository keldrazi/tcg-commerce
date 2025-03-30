import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ScryfallAPISetService } from 'src/tcgdb/modules/scryfall/api/set/scryfall.api.set.service';

@Injectable()
export class ScryfallAPICardService {

    constructor(
        private httpService: HttpService,  
        private scryfallAPISetService: ScryfallAPISetService,
    ) {}
    
    async getScryfallAPICardsByScryfallSet(scryfallSet: any) {

        let scryfallCardData: any[] = [];
        scryfallCardData = await this.getScryfallAPICardsBySetSearchURI(scryfallSet.scryfallMTGSetSearchURI, scryfallCardData);

        return scryfallCardData;
    }

    async getScryfallAPICardsBySetSearchURI(setSearchURI: string, scryfallCardData: any[]) {

        const request = this.httpService.get(setSearchURI)
            .pipe(map((response) => response.data))
            .pipe(
                catchError(() => {
                  throw new ForbiddenException('API not available');
                }),
              );

        const data = await lastValueFrom(request);
        const sryfallCardDataResult = data.data;

        scryfallCardData = scryfallCardData.concat(sryfallCardDataResult);

        if(data.has_more) {
            await this.getScryfallAPICardsBySetSearchURI(data.next_page, scryfallCardData);
        }

        return scryfallCardData;
    }
}


