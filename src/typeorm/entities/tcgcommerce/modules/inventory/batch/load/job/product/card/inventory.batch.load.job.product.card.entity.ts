import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryBatchLoadJobProductCard')
export class InventoryBatchLoadJobProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryBatchLoadJobProductCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    commerceUserId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productCardLanguageId: string;
    @Column()
    productCardSetId: string;
    @Column()
    productCardSetCode: string;
    @Column()
    inventoryBatchLoadJobProductCardDate: Date;
    @Column()
    inventoryBatchLoadJobProductCardCode: string;
    @Column()
    inventoryBatchLoadJobProductCardStatus: string;
    @Column('jsonb')
    inventoryBatchLoadJobProductCardData: string;
    @CreateDateColumn()
    inventoryBatchLoadJobProductCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryBatchLoadJobProductCardUpdateDate: Date;
}