import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fulfillmentOrderProductCardItem')
export class FullfillmentOrderProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    fullfillmentOrderProductCardItemId: string;
    @Column()
    fullfillmentOrderId: string;
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
    fullfillmentOrderProductCardItemQty: number;
    @Column({type: 'decimal', default: 0})
    fullfillmentOrderProductCardItemPrice: number;
    @CreateDateColumn()
    fullfillmentOrderProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    fullfillmentOrderProductCardItemUpdateDate: Date;
}