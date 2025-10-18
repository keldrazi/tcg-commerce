import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceRuleProductCardBase')
export class PriceRuleProductCardBase {
    @PrimaryGeneratedColumn('uuid')
    priceRuleProductCardBaseId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    priceRuleProductCardBaseOption: string;
    @Column()
    priceRuleProductCardBaseNMPercentage: number;
    @Column()
    priceRuleProductCardBaseLPPercentage: number
    @Column()
    priceRuleProductCardBaseMPPercentage: number
    @Column()
    priceRuleProductCardBaseHPPercentage: number
    @Column()
    priceRuleProductCardBaseDMPercentage: number;
    @CreateDateColumn()
    priceRuleProductCardBaseCreateDate: Date;
    @UpdateDateColumn()
    priceRuleProductCardBaseUpdateDate: Date;

}