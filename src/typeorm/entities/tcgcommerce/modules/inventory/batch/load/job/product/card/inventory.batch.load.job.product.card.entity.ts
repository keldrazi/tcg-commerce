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
    commerceLocationName: string;
    @Column()
    commerceUserId: string;
    @Column()
    commerceUserName: string;
    @Column()
    productVendorId: string;
    @Column()
    productVendorCode: string;
    @Column()
    productLineId: string;
    @Column()
    productLineCode: string;
    @Column()
    productTypeId: string;
    @Column()
    productTypeCode: string;
    @Column()
    productCardLanguageId: string;
    @Column()
    productCardLanguageCode: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
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