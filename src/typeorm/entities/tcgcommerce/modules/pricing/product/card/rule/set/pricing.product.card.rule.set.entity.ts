import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCardRuleSet')
export class PricingProductCardRuleSet {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardRuleSetId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    productLineId: string;

    @Column()
    pricingProductCardTypeId: string; //MTG
    
    @Column()
    pricingProductCardRuleTypeId: string; //Base Prcing

    @Column()
    pricingProductCardRuleSetName: string;

    @Column()
    pricingProductCardRuleSetPriceMinimumEnabled: boolean;

    @Column({type: 'decimal', nullable: true})
    pricingProductCardRuleSetPriceMinimum: number;

    @Column('jsonb')
    pricingProductCardRuleSetMetadata: string;

    @Column({type: 'boolean', default: false})
    pricingProductCardRuleSetIsActive: boolean;

    @CreateDateColumn()
    pricingProductCardRuleSetCreateDate: Date;

    @UpdateDateColumn()
    pricingProductCardRuleSetUpdateDate: Date; 

}