import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceUpdatePriceJobItem')
export class InventoryProductCardServiceUpdatePriceJobItem {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceUpdatePriceJobItemId: string;
    @Column()
    inventoryProductCardServiceUpdatePriceJobId: string;
    @Column()
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    productCardPrintingId: string;
    @Column()
    productCardPrintingName: string;
    @Column('jsonb')
    inventoryProductCardServiceUpdatePriceJobItemDetails: string;
    @CreateDateColumn()
    inventoryProductCardServiceUpdatePriceJobItemCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceUpdatePriceJobItemUpdateDate: Date; 
}