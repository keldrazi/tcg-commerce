import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistPriceProductCardRuleHotlist')
export class BuylistPriceProductCardRuleHotlist {
    @PrimaryGeneratedColumn('uuid')
    buylistPriceProductCardRuleHotlistId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    buylistPriceProductCardRuleHotlistOption: string;
    @Column()
    buylistPriceProductCardRuleHotlistCashPercentage: number;
    @Column()
    buylistPriceProductCardRuleHotlistCreditPercentage: number;
    @Column()
    buylistPriceProductCardRuleHotlistNMPercentage: number;
    @Column()
    buylistPriceProductCardRuleHotlistLPPercentage: number
    @Column()
    buylistPriceProductCardRuleHotlistMPPercentage: number
    @Column()
    buylistPriceProductCardRuleHotlistHPPercentage: number
    @Column()
    buylistPriceProductCardRuleHotlistDMPercentage: number;
    @CreateDateColumn()
    buylistPriceProductCardRuleHotlistCreateDate: Date;
    @UpdateDateColumn()
    buylistPriceProductCardRuleHotlistUpdateDate: Date;
}