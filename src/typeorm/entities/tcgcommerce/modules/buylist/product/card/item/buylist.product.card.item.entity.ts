import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistProductCardItem')
export class BuylistProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    buylistProductCardItemId: string;
    @Column()
    buylistProductCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    productCardName: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    productCardPrintingId: string;
    @Column()
    productCardPrintingName: string;
    @Column()
    productCardConditionId: string;
    @Column()
    productCardConditionCode: string;
    @Column()
    productCardConditionName: string;
    @Column({default: 0})
    buylistProductCardItemQty: number;
    @Column({type: 'decimal', default: 0})
    buylistProductCardItemPrice: number;
    @CreateDateColumn()
    buylistProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    buylistProductCardItemUpdateDate: Date;
}