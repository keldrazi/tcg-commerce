import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceImportJobItem')
export class InventoryProductCardServiceImportJobItem {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceImportJobItemId: string;
    @Column()
    inventoryProductCardServiceImportJobId: string;
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
    productCardConditionName: string;
    @Column()
    inventoryProductCardServiceImportJobItemQuantity: number;
    @CreateDateColumn()
    inventoryProductCardServiceImportJobItemCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceImportJobItemUpdateDate: Date;
}