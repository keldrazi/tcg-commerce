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
    pricingProductCardTypeId: string; //TCG Player Low;
    
    @Column()
    pricingProductCardRuleSetTypeId: string; //Baseline;

    @Column()
    pricingProductCardPriceMinimumEnabled: boolean;

    @Column({type: 'decimal', nullable: true})
    pricingProductCardPriceMinimum: number;

    @Column('jsob')
    pricingProductCardRuleSetMetadata: string;

    @Column({type: 'boolean', default: false})
    pricingProductCardRuleSetIsActive: boolean;

    @CreateDateColumn()
    pricingProductCardRuleSetCreateDate: Date;

    @UpdateDateColumn()
    pricingProductCardRuleSetUpdateDate: Date; 

}