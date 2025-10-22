import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceCreateJobItem')
export class InventoryProductCardServiceCreateJobItem {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceCreateJobItemId: string;
    @Column()
    inventoryProductCardServiceCreateJobId: string;
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
    inventoryProductCardServiceCreateJobItemDetails: string;
    @Column({ default: false })
    inventoryProductCardServiceCreateJobItemIsVerified: boolean;
    @Column({ default: true })
    inventoryProductCardServiceCreateJobItemIsActive: boolean;
    @CreateDateColumn()
    inventoryProductCardServiceCreateJobItemCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceCreateJobItemUpdateDate: Date; 
}