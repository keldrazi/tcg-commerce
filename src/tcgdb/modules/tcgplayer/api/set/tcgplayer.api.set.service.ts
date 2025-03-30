
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerAPISetService {

    constructor(
        private httpService: HttpService,  
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
    ) {}

    async getTCGPlayerAPISetNameByGroupId(groupId: string) {

        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        const url = 'https://api.tcgplayer.com/catalog/groups/' + groupId;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        console.log(url);
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        
        return data.results[0].name;
        
        
    }

    async getTCGPlayerAPISetCardCountByGroupId(groupId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        const url = 'https://api.tcgplayer.com/catalog/products?groupId='  + groupId + '&productTypes=Cards&limit=1';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        

        return data.totalItems;

    }

    async getTCGPlayerAPISetByGroupId(groupId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        const url = 'https://api.tcgplayer.com/catalog/groups/' + groupId;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        console.log(url);
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data.results[0];
    }

    async getTCGPlayerAPISetsByCategoryId(categoryId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        const setTotal = await this.getTCGPlayerAPITotalSetCountByCategoryId(categoryId);
        const totalCalls = Math.ceil(setTotal / 100);
        
        let setDataResult: any[] = [];
        let offset = 0;

        for(let i = 0; i < totalCalls; i++) {
        
            const url = 'https://api.tcgplayer.com/catalog/categories/' + categoryId + '/groups?limit=100&offset=' + offset;
            const headers = { 'Authorization': 'Bearer ' + accessToken };
            const response = this.httpService.get(url, { headers }).pipe(
                map(response => response.data),
                catchError(error => {
                    throw new ForbiddenException(error.response.data);
                })
            );

            let data = await lastValueFrom(response);
            setDataResult.push(data.results);
            offset = offset + 100;
        }
        
        let setData = [];

        for(let i=0; i < setDataResult.length; i++) {
            setData = setData.concat(setDataResult[i]);
        }

        return setData;
    }

    async getTCGPlayerAPITotalSetCountByCategoryId(categoryId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();
        
        const url = 'https://api.tcgplayer.com/catalog/categories/' + categoryId + '/groups';
        const headers = { 'Authorization': 'Bearer ' + accessToken };   
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        

        return data.totalItems;
    }
}


