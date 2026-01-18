import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fullfilmentOrderProductCardItem')
export class FullfilmentOrderProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    fullfilmentOrderProductCardItemId: string;
    @Column()
    fullfilmentOrderId: string;
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
    productCardRarityId: string;
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
    @Column()
    productCardConditionId: string;
    @Column()
    productCardConditionCode: string;
    @Column()
    productCardConditionName: string;
    @Column({default: 0})
    fullfilmentOrderProductCardItemQty: number;
    @Column({type: 'decimal', default: 0})
    fullfilmentOrderProductCardItemPrice: number;
    @CreateDateColumn()
    fullfilmentOrderProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    fullfilmentOrderProductCardItemUpdateDate: Date;
}