import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, Not, Repository } from 'typeorm';
import { ProductCardSearchResultDTO, ProductCardSearchDTO } from './dto/product.card.search.dto';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { AiImageCardServiceXimilarService } from 'src/system/modules/ai/image/card/service/ximilar/ai.image.card.service.ximilar.service';
import { AiImageCardServiceXimilarDTO } from 'src/system/modules/ai/image/card/service/ximilar/dto/ai.image.card.service.ximilar.dto';


@Injectable()
export class ProductCardSearchService {

    constructor(
        @InjectRepository(ProductCard) private productCardRepository: Repository<ProductCard>,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private aiImageCardServiceXimilarService: AiImageCardServiceXimilarService
    ) { }

    async searchProductCardsByName(productLineId: string, query: string): Promise<ProductCardSearchResultDTO> {

        if(query == null || query.trim() == '') {
            throw new BadRequestException('Product card search query cannot be empty.');
        }

        let productCardSearchResultDTO: ProductCardSearchResultDTO = {
            productCardSearchResultCount: 0,
            productCardSearchResults: []
        }

        let productCardSearchDTOs: ProductCardSearchDTO[] = [];

        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLineId,
                productCardName: ILike(`%${query}%`)
            },
            order: { 
                productCardName: 'ASC' 
            } 
        });

        if(!productCards || productCards.length == 0) {
            return productCardSearchResultDTO;
        }

        productCardSearchDTOs = productCards.map(card => {
            const productCardSearchDTO = new ProductCardSearchDTO();
            productCardSearchDTO.productCardId = card.productCardId;
            productCardSearchDTO.productCardTCGdbId = card.productCardTCGdbId;
            productCardSearchDTO.productCardTCGPlayerId = card.productCardTCGPlayerId;
            productCardSearchDTO.productVendorId = card.productVendorId;
            productCardSearchDTO.productLineId = card.productLineId;
            productCardSearchDTO.productSetId = card.productSetId;
            productCardSearchDTO.productSetCode = card.productSetCode;
            productCardSearchDTO.productCardRarityCode = card.productCardRarityCode;
            productCardSearchDTO.productCardNumber = card.productCardNumber;
            productCardSearchDTO.productCardName = card.productCardName;
            productCardSearchDTO.productCardCleanName = card.productCardCleanName;
            productCardSearchDTO.productCardImage = card.productCardImage;
        
            return productCardSearchDTO;
        });

        productCardSearchResultDTO = {
            productCardSearchResultCount: productCardSearchDTOs.length,
            productCardSearchResults: productCardSearchDTOs
        }

        return productCardSearchResultDTO;

    }

    async searchProductCardsBySetCode(productLineId: string, setCode: string): Promise<ProductCardSearchResultDTO> {
        
       
        let productSet = await this.productSetService.getProductSetByProductSetCode(productLineId, setCode);

        if(productSet == null) {
            throw new NotFoundException('Product set was not found for setCode: ' + setCode);
        }

        let productCardSearchResultDTO: ProductCardSearchResultDTO = {
            productCardSearchResultCount: 0,
            productCardSearchResults: []
        }

        let productCardSearchDTOs: ProductCardSearchDTO[] = [];

        let productCards = await this.productCardRepository.find({ 
            where: { 
                productSetId: productSet.productSetId
            },
            order: { 
                productCardName: 'ASC' 
            }
        });

        if(!productCards || productCards.length == 0) {
            return productCardSearchResultDTO;
        }

        productCardSearchDTOs = productCards.map(card => {
            const productCardSearchDTO = new ProductCardSearchDTO();
            productCardSearchDTO.productCardId = card.productCardId;
            productCardSearchDTO.productCardTCGdbId = card.productCardTCGdbId;
            productCardSearchDTO.productCardTCGPlayerId = card.productCardTCGPlayerId;
            productCardSearchDTO.productVendorId = card.productVendorId;
            productCardSearchDTO.productLineId = card.productLineId;
            productCardSearchDTO.productSetId = card.productSetId;
            productCardSearchDTO.productSetCode = card.productSetCode;
            productCardSearchDTO.productCardRarityCode = card.productCardRarityCode;
            productCardSearchDTO.productCardNumber = card.productCardNumber;
            productCardSearchDTO.productCardName = card.productCardName;
            productCardSearchDTO.productCardCleanName = card.productCardCleanName;
            productCardSearchDTO.productCardImage = card.productCardImage;
        
            return productCardSearchDTO;
        });

        productCardSearchResultDTO = {
            productCardSearchResultCount: productCardSearchDTOs.length,
            productCardSearchResults: productCardSearchDTOs
        }

        return productCardSearchResultDTO;
    }

    async searchProductCardByImage(productLineCode: string, productCardImageBase64: string, productCardPrintingType: string): Promise<ProductCardSearchDTO> {
        let aiImageCardServiceXimilarDTO: AiImageCardServiceXimilarDTO;
        try {
            aiImageCardServiceXimilarDTO = await this.aiImageCardServiceXimilarService.analyzeCardImage(productCardImageBase64, productCardPrintingType, productLineCode);
        } catch (e) {
            throw e;
        }

       let productCard = await this.productCardRepository.findOneOrFail({ 
            where: { 
                productSetCode: aiImageCardServiceXimilarDTO.aiImageCardServiceXimilarSetCode,
                productCardNumber: aiImageCardServiceXimilarDTO.aiImageCardServiceXimilarCardNumber,
                productCardRarityCode: Not(Equal('T'))
            }
        });


        const productCardSearchDTO = new ProductCardSearchDTO();
        productCardSearchDTO.productCardId = productCard.productCardId;
        productCardSearchDTO.productCardTCGdbId = productCard.productCardTCGdbId;
        productCardSearchDTO.productCardTCGPlayerId = productCard.productCardTCGPlayerId;
        productCardSearchDTO.productVendorId = productCard.productVendorId;
        productCardSearchDTO.productLineId = productCard.productLineId;
        productCardSearchDTO.productSetId = productCard.productSetId;
        productCardSearchDTO.productSetCode = productCard.productSetCode;
        productCardSearchDTO.productCardRarityCode = productCard.productCardRarityCode;
        productCardSearchDTO.productCardNumber = productCard.productCardNumber;
        productCardSearchDTO.productCardName = productCard.productCardName;
        productCardSearchDTO.productCardCleanName = productCard.productCardCleanName;
        productCardSearchDTO.productCardImage = productCard.productCardImage;

        return productCardSearchDTO;
          
    }
}


