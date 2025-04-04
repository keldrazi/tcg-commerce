import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingProductCard')
export class PricingProductCard {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    productCardTypeName: string;

    @Column()
    pricingProductCardPriceType: string;
    
    @Column()
    pricingProductCardPriceTypeOption: string;

    @Column()
    pricingProductCardPriceMinimumEnabled: boolean;

    @Column({type: 'decimal', nullable: true})
    pricingProductCardPriceMinimum: number;

    @Column('jsob')
    pricingProductCardRuleMetadata: string;

    @CreateDateColumn()
    pricingProductCardCreateDate: Date;

    @UpdateDateColumn()
    pricingProductCardUpdateDate: Date; 

}