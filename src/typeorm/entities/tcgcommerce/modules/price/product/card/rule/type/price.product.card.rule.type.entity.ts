import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PriceProductCardRuleTypeMetadata } from 'src/tcgcommerce/modules/price/product/card/rule/type/interface/price.product.card.rule.type.metadata.interface';

@Entity('priceProductCardRuleType')
export class PriceProductCardRuleType {
    @PrimaryGeneratedColumn('uuid')
    priceProductCardRuleTypeId: string;
    @Column()
    priceProductCardTypeId: string;
    @Column()
    priceProductCardRuleTypeName: string; //Base Price;
    @Column()
    priceProductCardRuleTypeCode: string; //base-price;
    @Column()
    priceProductCardRuleTypeDescription: string;
    @Column('jsonb')
    priceProductCardRuleTypeMetadata: PriceProductCardRuleTypeMetadata;
    @Column({type: 'boolean', default: false})
    priceProductCardRuleTypeIsActive: boolean;
    @CreateDateColumn()
    priceProductCardRuleTypeCreateDate: Date;
    @UpdateDateColumn()
    priceProductCardRuleTypeUpdateDate: Date;

}