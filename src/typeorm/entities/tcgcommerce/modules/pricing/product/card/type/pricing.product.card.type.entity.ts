import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCardType')
export class PricingProductCardType {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    pricingProductCardTypeName: string;
    @Column()
    pricingProductCardTypeDescription: string;
    @Column({type: 'boolean', default: false})
    pricingProductCardTypeIsActive: boolean;
    @CreateDateColumn()
    pricingProductCardTypeCreateDate: Date;
    @UpdateDateColumn()
    pricingProductCardTypeUpdateDate: Date; 

}