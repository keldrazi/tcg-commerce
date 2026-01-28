import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardPrintingDTO, ProductCardPrintingDTO, UpdateProductCardPrintingDTO } from './dto/product.card.printing.dto';
import { ProductCardPrinting } from 'src/typeorm/entities/tcgcommerce/modules/product/card/printing/product.card.printing.entity';
import { TCGdbMTGPrintingService } from 'src/tcgdb/modules/tcgdb/api/mtg/printing/tcgdb.mtg.printing.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductCardPrintingService {

    constructor(
        @InjectRepository(ProductCardPrinting) private productCardPrintingRepository: Repository<ProductCardPrinting>,
        private tcgdbMTGPrintingService: TCGdbMTGPrintingService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService
    ) { }

    async getProductCardPrintingById(productCardPrintingId: string): Promise<ProductCardPrintingDTO> {
        let productCardPrinting = await this.productCardPrintingRepository.findOneOrFail({
            where: { 
                productCardPrintingId: productCardPrintingId 
            } 
        });

        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
    }

    async getProductCardPrintingByName(productCardPrintingName: string): Promise<ProductCardPrintingDTO> {
        let productCardPrinting = await this.productCardPrintingRepository.findOneOrFail({
            where: { 
                productCardPrintingName: productCardPrintingName 
            } 
        });

        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
    }

    async getProductCardPrintingsByProductLineCode(productLineCode: string): Promise<ProductCardPrintingDTO[]> {

        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        let productLineId = productLine.productLineId;

        let productCardPrintings = await this.productCardPrintingRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        if(!productCardPrintings) {
            return productCardPrintingDTOs;
        }
        
        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    async getProductCardPrintingsByProductLineId(productLineId: string): Promise<ProductCardPrintingDTO[]> {

        let productCardPrintings = await this.productCardPrintingRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        if(!productCardPrintings) {
            return productCardPrintingDTOs;
        }

        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });
            
            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    

    async getProductCardPrintings(): Promise<ProductCardPrintingDTO[]> {
        let productCardPrintings = await this.productCardPrintingRepository.find({
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        if(!productCardPrintings) {
            return productCardPrintingDTOs;
        }
        
        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });
            
            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    async getProductCardPrintingByNameAndProductLineId(productCardPrintingName: string, productLineId: string): Promise<ProductCardPrintingDTO> {
        let productCardPrinting = await this.productCardPrintingRepository.findOneOrFail({ 
            where: { 
                productCardPrintingName: productCardPrintingName,
                productLineId: productLineId 
            } 
        });
        
        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
        
    }

    async createProductCardPrinting(createProductCardPrintingDTO: CreateProductCardPrintingDTO): Promise<ProductCardPrintingDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingName: createProductCardPrintingDTO.productCardPrintingName,
                productLineId: createProductCardPrintingDTO.productLineId,
                productVendorId: createProductCardPrintingDTO.productVendorId
            } 
        });

        if(productCardPrinting) {
            throw new ConflictException('A product card printing already exists.');
        }
        
        productCardPrinting = this.productCardPrintingRepository.create({ ...createProductCardPrintingDTO });
        productCardPrinting = await this.productCardPrintingRepository.save(productCardPrinting);

        let productCardPrintingDTO = await this.getProductCardPrintingById(productCardPrinting.productCardPrintingId);
        
        return productCardPrintingDTO;
        
    }

    async updateProductCardPrinting(updateProductCardPrintingDTO: UpdateProductCardPrintingDTO): Promise<ProductCardPrintingDTO> {
                        
        let productCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingId: updateProductCardPrintingDTO.productCardPrintingId
            } 
        });

        if(!productCardPrinting) {
            throw new NotFoundException('Product card printing was not found');
        }

        productCardPrinting.productCardPrintingName = updateProductCardPrintingDTO.productCardPrintingName;
        productCardPrinting.productCardPrintingDisplayOrder = updateProductCardPrintingDTO.productCardPrintingDisplayOrder;
        productCardPrinting.productCardPrintingIsActive = updateProductCardPrintingDTO.productCardPrintingIsActive;
        productCardPrinting.productCardPrintingUpdateDate = new Date();
        
        await this.productCardPrintingRepository.save(productCardPrinting);

        let productCardPrintingDTO = this.getProductCardPrintingById(productCardPrinting.productCardPrintingId);

        return productCardPrintingDTO;
    
    }

    //BULK CREATE PRODUCT CARD PRINTINGS;
    async createProductCardPrintingsByProductLineCode(productLineCode: string): Promise<number> {
        //TO DO: CREATE PRODUCT CARD PRINTINGS;
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCardPrintings();
        } else {
            throw new NotFoundException('Product line was not found');
        }
    }

    async createTCGdbMTGProductCardPrintings(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);
        
        //GET THE PRODUCT CARD PRINTINGS FROM TCGDB;
        let tcgdbMTGProductCardPrintings = await this.tcgdbMTGPrintingService.getTCGdbMTGPrintings();
        
        let productCardPrintingRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardPrintings.length; i++) {
            let tcgdbMTGProductCardPrinting = tcgdbMTGProductCardPrintings[i];
            
            let productCardPrinting = await this.productCardPrintingRepository.findOne({ 
                where: { 
                    productCardPrintingName: tcgdbMTGProductCardPrinting.tcgdbMTGPrintingName,
                    productLineId: productLine.productLineId 
                } 
            });
            
            if(!productCardPrinting) {
                productCardPrinting = this.productCardPrintingRepository.create();
                productCardPrinting.productVendorId = productVendor.productVendorId;
                productCardPrinting.productLineId = productLine.productLineId;
                productCardPrinting.productCardPrintingTCGdbId = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingId;
                productCardPrinting.productCardPrintingTCGPlayerId = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingTCGPlayerId;
                productCardPrinting.productCardPrintingName = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingName;
                productCardPrinting.productCardPrintingDisplayOrder = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingDisplayOrder;
                productCardPrinting.productCardPrintingIsActive = true;
                
                await this.productCardPrintingRepository.save(productCardPrinting);

                productCardPrintingRecordCount++;
                
            }
            
        }

        return productCardPrintingRecordCount;
    }
    
    
}