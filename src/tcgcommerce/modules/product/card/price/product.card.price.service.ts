import { Injectable } from '@nestjs/common';
import { ProductCardPriceDTO} from './dto/product.card.price.dto';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { PRODUCT_LINE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';


@Injectable()
export class ProductCardPriceService {

    constructor(
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) { }

    async getProductCardPrices(productLineCode:string, productCardItemTCGdbId: string, productCardItemId: string) {
        switch (productLineCode) {
            case PRODUCT_LINE_CODE.MAGIC_THE_GATHERING:
                return this.getMTGProductCardPrices(productCardItemTCGdbId, productCardItemId);
            case PRODUCT_LINE_CODE.POKEMON:
                return null;
        }
    }


    async getMTGProductCardPrices(productCardItemTCGdbId: string, productCardItemId: string) {
        let tcgdbMTGPriceCurrentsDTO = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentByCardId(productCardItemTCGdbId);
        if (tcgdbMTGPriceCurrentsDTO == null) {
            return null;
        }

        let productCardPriceDTOs: ProductCardPriceDTO[] = [];
        for (let i = 0; i < tcgdbMTGPriceCurrentsDTO.tcgdbMTGPricesCurrent.length; i++) {
            let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrentsDTO.tcgdbMTGPricesCurrent[i];
            let productCardPriceDTO: ProductCardPriceDTO = {
                productCardItemId: productCardItemId,
                productCardPrintingName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName,
                productCardPriceCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
                productCardPriceCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
                productCardPriceCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
                productCardPriceCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
                productCardPriceCurrentDirectLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentDirectLowPrice,
            };
            
            productCardPriceDTOs.push(productCardPriceDTO);
        }

        return productCardPriceDTOs;
    }

}