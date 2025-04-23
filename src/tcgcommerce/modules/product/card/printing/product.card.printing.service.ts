import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardPrintingDTO, ProductCardPrintingDTO, UpdateProductCardPrintingDTO } from './dto/product.card.printing.dto';
import { ProductCardPrinting } from 'src/typeorm/entities/tcgcommerce/modules/product/card/printing/product.card.printing.entity';

@Injectable()
export class ProductCardPrintingService {

    constructor(
        @InjectRepository(ProductCardPrinting) private productCardPrintingRepository: Repository<ProductCardPrinting>,
    ) { }

    async getProductCardPrinting(productCardPrintingId: string) {
        let productCardPrinting = await this.productCardPrintingRepository.findOne({
            where: { 
                productCardPrintingId: productCardPrintingId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrinting == null) {
            return null;
        }

        let productCardPrintingDTO = new ProductCardPrintingDTO();
        productCardPrintingDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
        productCardPrintingDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;
        productCardPrintingDTO.productCardPrintingAbbreviation = productCardPrinting.productCardPrintingAbbreviation;
        productCardPrintingDTO.productCardPrintingDisplayOrder = productCardPrinting.productCardPrintingDisplayOrder;
        productCardPrintingDTO.productCardPrintingIsActive = productCardPrinting.productCardPrintingIsActive;
        productCardPrintingDTO.productCardPrintingCreateDate = productCardPrinting.productCardPrintingCreateDate;
        productCardPrintingDTO.productCardPrintingUpdateDate = productCardPrinting.productCardPrintingUpdateDate;

        return productCardPrintingDTO;
    }
    
    async getProductCardPrintings() {
        let productCardPrintings = await this.productCardPrintingRepository.find({
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrintings == null) {
            return null;
        }
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO = new ProductCardPrintingDTO();
            productCardPrintingDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
            productCardPrintingDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;
            productCardPrintingDTO.productCardPrintingAbbreviation = productCardPrinting.productCardPrintingAbbreviation;
            productCardPrintingDTO.productCardPrintingDisplayOrder = productCardPrinting.productCardPrintingDisplayOrder;
            productCardPrintingDTO.productCardPrintingIsActive = productCardPrinting.productCardPrintingIsActive;
            productCardPrintingDTO.productCardPrintingCreateDate = productCardPrinting.productCardPrintingCreateDate;
            productCardPrintingDTO.productCardPrintingUpdateDate = productCardPrinting.productCardPrintingUpdateDate;
            
            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    async getProductCardPrintingByName(name: string) {
        let productCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingName: name 
            } 
        });
        
        if (productCardPrinting == null) {
            return null;
        }

        let productCardPrintingDTO = new ProductCardPrintingDTO();
        productCardPrintingDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
        productCardPrintingDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;
        productCardPrintingDTO.productCardPrintingAbbreviation = productCardPrinting.productCardPrintingAbbreviation;
        productCardPrintingDTO.productCardPrintingDisplayOrder = productCardPrinting.productCardPrintingDisplayOrder;
        productCardPrintingDTO.productCardPrintingIsActive = productCardPrinting.productCardPrintingIsActive;
        productCardPrintingDTO.productCardPrintingCreateDate = productCardPrinting.productCardPrintingCreateDate;
        productCardPrintingDTO.productCardPrintingUpdateDate = productCardPrinting.productCardPrintingUpdateDate;

        return productCardPrintingDTO;
        
    }

    async createProductCardPrinting(createProductCardPrintingDTO: CreateProductCardPrintingDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardPrinting = await this.getProductCardPrintingByName(createProductCardPrintingDTO.productCardPrintingName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardPrinting != null) {
            return null;
        }
        
        let newProductCardPrinting = this.productCardPrintingRepository.create({ ...createProductCardPrintingDTO });
        newProductCardPrinting = await this.productCardPrintingRepository.save(newProductCardPrinting);

        let productCardPrintingDTO = this.getProductCardPrinting(newProductCardPrinting.productCardPrintingId);
        
        return productCardPrintingDTO;
        
    }

    async updateProductCardPrinting(updateProductCardPrintingDTO: UpdateProductCardPrintingDTO) {
                        
        let existingProductCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingId: updateProductCardPrintingDTO.productCardPrintingId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardPrinting) {
            return null; 
        }

        existingProductCardPrinting.productCardPrintingName = updateProductCardPrintingDTO.productCardPrintingName;
        existingProductCardPrinting.productCardPrintingAbbreviation = updateProductCardPrintingDTO.productCardPrintingAbbreviation;
        existingProductCardPrinting.productCardPrintingDisplayOrder = updateProductCardPrintingDTO.productCardPrintingDisplayOrder;
        existingProductCardPrinting.productCardPrintingIsActive = updateProductCardPrintingDTO.productCardPrintingIsActive;
        existingProductCardPrinting.productCardPrintingUpdateDate = new Date();
        
        await this.productCardPrintingRepository.save(existingProductCardPrinting);

        let productCardPrintingDTO = this.getProductCardPrinting(existingProductCardPrinting.productCardPrintingId);

        return productCardPrintingDTO;
    
    }
    
}