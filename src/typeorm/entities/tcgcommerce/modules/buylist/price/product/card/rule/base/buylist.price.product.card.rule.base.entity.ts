import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistPriceProductCardRuleBase')
export class BuylistPriceProductCardRuleBase {
    @PrimaryGeneratedColumn('uuid')
    buylistPriceProductCardRuleBaseId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    buylistLocationId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    buylistPriceProductCardRuleBaseOption: string;
    @Column()
    buylistPriceProductCardRuleBaseCashPercentage: number;
    @Column()
    buylistPriceProductCardRuleBaseCreditPercentage: number;
    @Column()
    buylistPriceProductCardRuleBaseNMPercentage: number;
    @Column()
    buylistPriceProductCardRuleBaseLPPercentage: number
    @Column()
    buylistPriceProductCardRuleBaseMPPercentage: number
    @Column()
    buylistPriceProductCardRuleBaseHPPercentage: number
    @Column()
    buylistPriceProductCardRuleBaseDMPercentage: number;
    @CreateDateColumn()
    buylistPriceProductCardRuleBaseCreateDate: Date;
    @UpdateDateColumn()
    buylistPriceProductCardRuleBaseUpdateDate: Date;
}