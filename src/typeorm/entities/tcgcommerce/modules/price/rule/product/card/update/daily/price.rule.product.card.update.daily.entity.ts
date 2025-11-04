import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceRuleProductCardUpdateDaily')
export class PriceRuleProductCardUpdateDaily {
    @PrimaryGeneratedColumn('uuid')
    priceRuleProductCardUpdateDailyId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column('jsonb')
    priceRuleProductCardUpdateDailyCommerceLocationIds: string;
    @CreateDateColumn()
    priceRuleProductCardUpdateDailyCreateDate: Date;
    @UpdateDateColumn()
    priceRuleProductCardUpdateDailyUpdateDate: Date;

}