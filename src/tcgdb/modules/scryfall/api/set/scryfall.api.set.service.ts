import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class ScryfallAPISetService {

    constructor(
        private httpService: HttpService,  
    ) {}

    private scryfallSetsURI = 'https://api.scryfall.com/sets';

    async getScryfallAPISets(){

        const request = this.httpService.get(this.scryfallSetsURI)
            .pipe(map((response) => response.data))
            .pipe(
                catchError(() => {
                  throw new ForbiddenException('API not available');
                }),
              );

        const setData = await lastValueFrom(request);

        return setData.data;

    }
    
}


