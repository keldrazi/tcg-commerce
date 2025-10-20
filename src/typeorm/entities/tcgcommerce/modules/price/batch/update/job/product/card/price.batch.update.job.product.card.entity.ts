import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceBatchUpdateJobProductCard')
export class PriceBatchUpdateJobProductCard {
    @PrimaryGeneratedColumn('uuid')
    priceBatchUpdateJobProductCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productVendorCode: string;
    @Column()
    productLineId: string;
    @Column()
    productLineCode: string;
    @Column()
    productTypeId: string;
    @Column()
    productTypeCode: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    priceRuleProductCardBaseId: string;
    @Column()
    priceRuleProductCardBaseOption: string;
    @Column()
    priceBatchUpdateJobProductCardDate: Date;
    @Column()
    priceBatchUpdateJobProductCardCode: string;
    @Column()
    priceBatchUpdateJobProductCardStatus: string;
    @Column({ default: 0 })
    priceBatchUpdateJobProductCardCountIncrease: number;
    @Column({ default: 0 })
    priceBatchUpdateJobProductCardCountDecrease: number;
    @CreateDateColumn()
    priceBatchUpdateJobProductCardCreateDate: Date;
    @UpdateDateColumn()
    priceBatchUpdateJobProductCardUpdateDate: Date;
}