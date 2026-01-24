import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardRarityDTO, ProductCardRarityDTO, UpdateProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarity } from 'src/typeorm/entities/tcgcommerce/modules/product/card/rarity/product.card.rarity.entity';
import { TCGdbMTGRarityService } from 'src/tcgdb/modules/tcgdb/api/mtg/rarity/tcgdb.mtg.rarity.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';
import { NotFound } from '@aws-sdk/client-s3';

@Injectable()
export class ProductCardRarityService {

    constructor(
        @InjectRepository(ProductCardRarity) private productCardRarityRepository: Repository<ProductCardRarity>,
        private tcgdbMTGRarityService: TCGdbMTGRarityService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
    ) { }

    async getProductCardRarityById(productCardRarityId: string): Promise<ProductCardRarityDTO> {
        let productCardRarity = await this.productCardRarityRepository.findOneOrFail({
            where: { 
                productCardRarityId: productCardRarityId 
            } 
        });

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
    }
    
    async getProductCardRaritiesByProductLineCode(productLineCode: string): Promise<ProductCardRarityDTO[]> {

        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        let productCardRarities = await this.productCardRarityRepository.find({
            where: { 
                productLineId: productLine.productLineId 
            }
        });
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        if(productCardRarities == null) {
            return productCardRarityDTOs;
        }

        for(let i = 0; i < productCardRarities.length; i++) {
            let productCardRarity = productCardRarities[i];
            let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;

    }
    
    async getProductCardRarities(): Promise<ProductCardRarityDTO[]> {
        let productCardRarities = await this.productCardRarityRepository.find();
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        if(productCardRarities == null) {
            return productCardRarityDTOs;
        }
      
        for(let i = 0; i < productCardRarities.length; i++) {
            let productCardRarity = productCardRarities[i];
            let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;
    }

    async getProductCardRarityByNameAndProductLineId(productCardRarityName: string, productLineId: string): Promise<ProductCardRarityDTO> {
        let productCardRarity = await this.productCardRarityRepository.findOneOrFail({ 
            where: { 
                productCardRarityName: productCardRarityName,
                productLineId: productLineId 
            } 
        });
        
        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
        
    }

    async getProductCardRarityByCodeAndProductLineId(productCardRarityCode: string, productLineId: string): Promise<ProductCardRarityDTO> {
        let productCardRarity = await this.productCardRarityRepository.findOneOrFail({ 
            where: { 
                productCardRarityCode: productCardRarityCode,
                productLineId: productLineId 
            } 
        });

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
        
    }

    async createProductCardRarity(createProductCardRarityDTO: CreateProductCardRarityDTO): Promise<ProductCardRarityDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityName: createProductCardRarityDTO.productCardRarityName,
                productLineId: createProductCardRarityDTO.productLineId,
                productVendorId: createProductCardRarityDTO.productVendorId
            } 
        });
        
        if (productCardRarity) {
            throw new ConflictException('Product card rarity already exists');
        }
        
        productCardRarity = this.productCardRarityRepository.create({ ...createProductCardRarityDTO });
        productCardRarity = await this.productCardRarityRepository.save(productCardRarity);

        let productCardRarityDTO = await this.getProductCardRarityById(productCardRarity.productCardRarityId);
        
        return productCardRarityDTO;
        
    }

    async updateProductCardRarity(updateProductCardRarityDTO: UpdateProductCardRarityDTO): Promise<ProductCardRarityDTO> {
                        
        let productCardRarity = await this.productCardRarityRepository.findOneOrFail({ 
            where: { 
                productCardRarityId: updateProductCardRarityDTO.productCardRarityId
            } 
        });

        productCardRarity.productCardRarityName = updateProductCardRarityDTO.productCardRarityName;
        productCardRarity.productCardRarityCode = updateProductCardRarityDTO.productCardRarityCode;
        productCardRarity.productCardRarityIsActive = updateProductCardRarityDTO.productCardRarityIsActive;
        productCardRarity.productCardRarityUpdateDate = new Date();
        
        await this.productCardRarityRepository.save(productCardRarity);

        let productCardRarityDTO = await this.getProductCardRarityById(productCardRarity.productCardRarityId);
        
        return productCardRarityDTO;
    
    }

    //BULK CREATE PRODUCT CARD RARITIES BY PRODUCT LINE CODE;
    async createProductCardRaritiesByProductLineCode(productLineCode: string): Promise<number> {
        //TO DO: CREATE PRODUCT CARD RARITIES FOR OTHER PRODUCT LINES;
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCardRarities();
        } else {
            throw new NotFoundException('Product line code not found for bulk product card rarity creation.');
        }
    }

    async createTCGdbMTGProductCardRarities(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);

        //GET THE PRODUCT CARD RARITIES FROM TCGDB;
        let tcgdbMTGProductCardRarities = await this.tcgdbMTGRarityService.getTCGdbMTGRarities();

        let productCardRarityRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardRarities.length; i++) {
            let tcgdbMTGProductCardRarity = tcgdbMTGProductCardRarities[i];
            
            let productCardRarity = await this.productCardRarityRepository.findOneOrFail({ 
                where: { 
                    productCardRarityCode: tcgdbMTGProductCardRarity.tcgdbMTGRarityCode,
                    productLineId: productLine.productLineId 
                } 
            });
            if(!productCardRarity) {
                let createProductCardRarityDTO = new CreateProductCardRarityDTO();
                createProductCardRarityDTO.productVendorId = productVendor.productVendorId;
                createProductCardRarityDTO.productLineId = productLine.productLineId;
                createProductCardRarityDTO.productCardRarityTCGdbId = tcgdbMTGProductCardRarity.tcgdbMTGRarityId;
                createProductCardRarityDTO.productCardRarityTCGPlayerId = tcgdbMTGProductCardRarity.tcgdbMTGRarityTCGPlayerId;
                createProductCardRarityDTO.productCardRarityName = tcgdbMTGProductCardRarity.tcgdbMTGRarityName;
                createProductCardRarityDTO.productCardRarityCode = tcgdbMTGProductCardRarity.tcgdbMTGRarityCode;
                createProductCardRarityDTO.productCardRarityIsActive = true;
                
                await this.createProductCardRarity(createProductCardRarityDTO);

                productCardRarityRecordCount++; 
            }
        }

        return productCardRarityRecordCount;

    }
    
}