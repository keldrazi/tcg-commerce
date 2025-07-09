import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCardRuleType')
export class PricingProductCardRuleType {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardRuleTypeId: string;
    
    @Column()
    pricingProductCardTypeId: string;

    @Column()
    pricingProductCardRuleTypeName: string; //Base Price;

    @Column()
    pricingProductCardRuleTypeCode: string; //base-price;

    @Column()
    pricingProductCardRuleTypeDescription: string;

    @Column('jsonb')
    pricingProductCardRuleTypeMetadata: string;

    @Column({type: 'boolean', default: false})
    pricingProductCardRuleTypeIsActive: boolean;

    @CreateDateColumn()
    pricingProductCardRuleTypeCreateDate: Date;

    @UpdateDateColumn()
    pricingProductCardRuleTypeUpdateDate: Date; 

}