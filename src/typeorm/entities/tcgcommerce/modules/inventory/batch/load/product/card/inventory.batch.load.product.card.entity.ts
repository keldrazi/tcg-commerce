import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryBatchLoadProductCard')
export class InventoryBatchLoadProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryBatchLoadProductCardId: string;
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
    inventoryBatchLoadProductCardItems: string;
    @Column({ default: false })
    inventoryBatchLoadProductCardIsVerified: boolean;
    @Column({ default: true })
    inventoryBatchLoadProductCardIsActive: boolean;
    @CreateDateColumn()
    inventoryBatchLoadProductCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryBatchLoadProductCardUpdateDate: Date; 

}