import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PriceProductCardRuleSetMetadata } from 'src/tcgcommerce/modules/price/product/card/rule/set/interface/price.product.card.rule.set.metadata.interface';

@Entity('priceProductCardRuleSet')
export class PriceProductCardRuleSet {
    @PrimaryGeneratedColumn('uuid')
    priceProductCardRuleSetId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    priceProductCardTypeId: string;
    @Column()
    priceProductCardRuleTypeId: string; //Base Price
    @Column()
    priceProductCardRuleTypeCode:string;
    @Column()
    priceProductCardRuleSetName: string;
    @Column('jsonb')
    priceProductCardRuleSetMetadata: PriceProductCardRuleSetMetadata;
    @Column({type: 'boolean', default: false})
    priceProductCardRuleSetIsActive: boolean;
    @CreateDateColumn()
    priceProductCardRuleSetCreateDate: Date;
    @UpdateDateColumn()
    priceProductCardRuleSetUpdateDate: Date;

}