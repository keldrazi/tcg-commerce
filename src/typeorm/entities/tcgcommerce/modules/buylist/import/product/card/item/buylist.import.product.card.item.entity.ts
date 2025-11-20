import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistImportProductCardItem')
export class BuylistImportProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    buylistImportProductCardItemId: string;
    @Column()
    buylistImportProductCardId: string;
    @Column()
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
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
    @Column()
    buylistImportProductCardItemQty: number;
    @Column('jsonb')
    buylistImportProductCardItemCSVData: string;
    @CreateDateColumn()
    buylistImportProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    buylistImportProductCardItemUpdateDate: Date;
}