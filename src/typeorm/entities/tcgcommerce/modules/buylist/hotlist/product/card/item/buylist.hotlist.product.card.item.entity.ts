import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistHotlistProductCardItem')
export class BuylistHotlistProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    buylistHotlistProductCardItemId: string;
    @Column()
    buylistHotlistProductCardId: string;
    @Column()
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    productCardName: string;
    @Column()
    productCardNumber: string;
    @Column()
    productCardRarityId: string
    @Column()
    productCardRarityCode: string;
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
    @Column({default: 0})
    buylistHotlistProductCardItemQty: number;
    @Column({default: false})
    buylistHotlistProductCardItemOverridePriceEnabled: boolean;
    @Column({type: 'decimal', default: 0})
    buylistHotlistProductCardItemOverridePrice: number;
    @CreateDateColumn()
    buylistHotlistProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    buylistHotlistProductCardItemUpdateDate: Date;
}