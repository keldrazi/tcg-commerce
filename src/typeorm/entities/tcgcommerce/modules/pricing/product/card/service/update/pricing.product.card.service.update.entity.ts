import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PricingProductCardRuleSetMetadata } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/interface/pricing.product.card.rule.set.metadata.interface';

@Entity('pricingProductCardServiceUpdate')
export class PricingProductCardServiceUpdate {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardServiceUpdateId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    pricingProductCardServiceUpdateCode: string;
    @Column()
    pricingProductCardServiceUpdateTotalCards: number;
    @Column()
    pricingProductCardServiceUpdateTotalCardsIncrease: number;
    @Column()
    pricingProductCardServiceUpdateTotalCardsDecrease: number;
    @Column('jsonb')
    pricingProductCardServiceUpdateData: PricingProductCardRuleSetMetadata;
    @Column({type: 'boolean', default: false})
    pricingProductCardServiceUpdateIsComplete: boolean;
    @CreateDateColumn()
    pricingProductCardServiceUpdateCreateDate: Date;
    @UpdateDateColumn()
    pricingProductCardServiceUpdateUpdateDate: Date;

}