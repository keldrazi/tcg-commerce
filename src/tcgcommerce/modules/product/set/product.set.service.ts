import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSetDTO, CreateProductSetDTO, UpdateProductSetDTO } from './dto/product.set.dto';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';

@Injectable()
export class ProductSetService {

    constructor(
        @InjectRepository(ProductSet) private productSetRepository: Repository<ProductSet>,
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
        productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
        productSetDTO.productSetExtendedData = productSet.productSetExtendedData;
        productSetDTO.productSetMetadata = productSet.productSetMetadata;
        productSetDTO.productSetIsActive = productSet.productSetIsActive;
        productSetDTO.productSetCreateDate = productSet.productSetCreateDate;
        productSetDTO.productSetUpdateDate = productSet.productSetUpdateDate;

        return productSetDTO;

    }

    async getProductSets(productVendorId: string, productLineId: string) {
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
            productSetDTO.productSetExtendedData = productSet.productSetExtendedData;
            productSetDTO.productSetMetadata = productSet.productSetMetadata;
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
        productSetDTO.productSetAbbreviation = productSet.productSetAbbreviation;
        productSetDTO.productSetExtendedData = productSet.productSetExtendedData;
        productSetDTO.productSetMetadata = productSet.productSetMetadata;
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
        existingProductSet.productSetExtendedData = updateProductSetDTO.productSetExtendedData;
        existingProductSet.productSetMetadata = updateProductSetDTO.productSetMetadata;
        existingProductSet.productSetIsActive = updateProductSetDTO.productSetIsActive;
        existingProductSet.productSetUpdateDate = new Date();
        
        await this.productSetRepository.save(existingProductSet);

        let productSetDTO = this.getProductSet(existingProductSet.productSetId);

        return productSetDTO;
    
    }
}