import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCardRuleType')
export class PricingProductCardRuleType {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardRuleTypeId: string;
    
    @Column()
    pricingProductCardRuleTypeName: string; //Baseline;

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