import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCardRuleSet')
export class PricingProductCardRuleSet {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardRuleSetId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineId: string;
    
    @Column()
    productTypeId: string;

    @Column()
    pricingProductCardTypeId: string;

    @Column()
    pricingProductCardRuleTypeId: string; //Base Pricing

    @Column()
    pricingProductCardRuleTypeCode:string;
    
    @Column()
    pricingProductCardRuleSetName: string;

    @Column('jsonb')
    pricingProductCardRuleSetMetadata: string;

    @Column({type: 'boolean', default: false})
    pricingProductCardRuleSetIsActive: boolean;

    @CreateDateColumn()
    pricingProductCardRuleSetCreateDate: Date;

    @UpdateDateColumn()
    pricingProductCardRuleSetUpdateDate: Date; 

}