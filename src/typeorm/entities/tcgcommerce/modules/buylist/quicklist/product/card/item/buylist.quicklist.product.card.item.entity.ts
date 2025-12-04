import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistQuicklistProductCardItem')
export class BuylistQuicklistProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    buylistQuicklistProductCardItemId: string;
    @Column()
    buylistQuicklistProductCardId: string;
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
    @CreateDateColumn()
    buylistQuicklistProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    buylistQuicklistProductCardItemUpdateDate: Date;
}