import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSetDTO, CreateProductSetDTO, UpdateProductSetDTO } from './dto/product.set.dto';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';

@Injectable()
export class ProductSetService {

    //SET DATA;
    private MTG_SET_VENDOR_ID = "67d0735c-da47-480d-b3e2-651b9fc5a2d8"; //WoTC;
    private MTG_SET_LINE_ID = "1258359b-bb37-4323-8749-cd4fa40037f9"; //Magic: The Gathering;
    

    constructor(
        @InjectRepository(ProductSet) private productSetRepository: Repository<ProductSet>,
        private tcgdbMTGSetService: TCGdbMTGSetService,
    ) { }

    async getProductSet(productSetId: string) {
        let productSet = await this.productSetRepository.findOne({
            where: { 
                productSetId: productSetId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productSet == null) {
            return null;
        }

        let productSetDTO = new ProductSetDTO();
        productSetDTO.productSetId = productSet.productSetId;
        productSetDTO.productVendorId = productSet.productVendorId;
        productSetDTO.productLineId = productSet.productLineId;
        productSetDTO.productSetName = productSet.productSetName;
        productSetDTO.productSetReleaseDate = productSet.productSetReleaseDate;
        productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
        productSetDTO.productSetTotalCards = productSet.productSetTotalCards;
        productSetDTO.productSetIsActive = productSet.productSetIsActive;
        productSetDTO.productSetCreateDate = productSet.productSetCreateDate;
        productSetDTO.productSetUpdateDate = productSet.productSetUpdateDate;

        return productSetDTO;

    }

    async getProductSetsByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string) {
        let productSets = await this.productSetRepository.find({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productSets == null) {
            return null;
        }
        
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO = new ProductSetDTO();
            productSetDTO.productSetId = productSet.productSetId;
            productSetDTO.productVendorId = productSet.productVendorId;
            productSetDTO.productLineId = productSet.productLineId;
            productSetDTO.productSetName = productSet.productSetName;
            productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
            productSetDTO.productSetReleaseDate = productSet.productSetReleaseDate;
            productSetDTO.productSetTotalCards = productSet.productSetTotalCards;
            productSetDTO.productSetIsActive = productSet.productSetIsActive;
            productSetDTO.productSetCreateDate = productSet.productSetCreateDate;
            productSetDTO.productSetUpdateDate = productSet.productSetUpdateDate;
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }

    async getProductSetsByProductLineId(productLineId: string) {
        let productSets = await this.productSetRepository.find({
            where: {
                productLineId: productLineId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productSets == null) {
            return null;
        }
        
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO = new ProductSetDTO();
            productSetDTO.productSetId = productSet.productSetId;
            productSetDTO.productVendorId = productSet.productVendorId;
            productSetDTO.productLineId = productSet.productLineId;
            productSetDTO.productSetName = productSet.productSetName;
            productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
            productSetDTO.productSetReleaseDate = productSet.productSetReleaseDate;
            productSetDTO.productSetTotalCards = productSet.productSetTotalCards;
            productSetDTO.productSetIsActive = productSet.productSetIsActive;
            productSetDTO.productSetCreateDate = productSet.productSetCreateDate;
            productSetDTO.productSetUpdateDate = productSet.productSetUpdateDate;
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }
    
    async getProductSetByName(productVendorId: string, productLineId: string, productSetName: string) {
        let productSet = await this.productSetRepository.findOne({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productSetName: productSetName
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productSet == null) {
            return null;
        }
        
        let productSetDTO = new ProductSetDTO();
        productSetDTO.productSetId = productSet.productSetId;
        productSetDTO.productVendorId = productSet.productVendorId;
        productSetDTO.productLineId = productSet.productLineId;
        productSetDTO.productSetName = productSet.productSetName;
        productSetDTO.productSetReleaseDate = productSet.productSetReleaseDate;
        productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
        productSetDTO.productSetTotalCards = productSet.productSetTotalCards;
        productSetDTO.productSetIsActive = productSet.productSetIsActive;
        productSetDTO.productSetCreateDate = productSet.productSetCreateDate;
        productSetDTO.productSetUpdateDate = productSet.productSetUpdateDate;
            
        return productSetDTO;
    }
    
    async createProductSet(createProductSetDTO: CreateProductSetDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productSet = await this.getProductSetByName(createProductSetDTO.productVendorId, createProductSetDTO.productLineId, createProductSetDTO.productSetName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productSet != null) {
            return null;
        }
        
        let newProductSet = this.productSetRepository.create({ ...createProductSetDTO });
        newProductSet = await this.productSetRepository.save(newProductSet);

        let productSetDTO = this.getProductSet(newProductSet.productSetId);

        return productSetDTO;
        
    }  
    
    async updateProductSet(updateProductSetDTO: UpdateProductSetDTO) {
                            
        let existingProductSet = await this.productSetRepository.findOne({ 
            where: { 
                productSetId: updateProductSetDTO.productSetId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductSet) {
            return null; 
        }

        existingProductSet.productSetName = updateProductSetDTO.productSetName;
        existingProductSet.productSetAbbreviation = updateProductSetDTO.productSetAbbreviation;
        existingProductSet.productSetReleaseDate = updateProductSetDTO.productSetReleaseDate;
        existingProductSet.productSetTotalCards = updateProductSetDTO.productSetTotalCards;
        existingProductSet.productSetIsActive = updateProductSetDTO.productSetIsActive;
        existingProductSet.productSetUpdateDate = new Date();
        
        await this.productSetRepository.save(existingProductSet);

        let productSetDTO = this.getProductSet(existingProductSet.productSetId);

        return productSetDTO;
    
    }

    async createProductSetsByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT SETS FOR ALL VENDORS;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductSets();
        } else {
            return null;
        }
    }

    //TCGdb MTG PRODUCT SET CREATION;
    async createTCGdbMTGProductSets() {

        let tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < tcgdbMTGSets.length; i++) {
            let tcgdbMTGSet = tcgdbMTGSets[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let productSet = await this.getProductSetByName(this.MTG_SET_VENDOR_ID, this.MTG_SET_LINE_ID, tcgdbMTGSet.tcgdbMTGSetName);
            
            //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
            if (productSet != null) {
                continue;
            }

            let newProductSet = this.productSetRepository.create({
                productVendorId: this.MTG_SET_VENDOR_ID,
                productLineId: this.MTG_SET_LINE_ID,
                productSetName: tcgdbMTGSet.tcgdbMTGSetName,
                productSetAbbreviation: tcgdbMTGSet.tcgdbMTGSetAbbreviation,
                productSetTotalCards: tcgdbMTGSet.tcgdbMTGSetTotalCards,
                productSetReleaseDate: tcgdbMTGSet.tcgdbMTGSetPublishedOn,
                productSetIsActive: true,
            });

            let productSetDTO = await this.productSetRepository.save(newProductSet);
            productSetDTOs.push(productSetDTO);

        }

        return productSetDTOs;

    }
}