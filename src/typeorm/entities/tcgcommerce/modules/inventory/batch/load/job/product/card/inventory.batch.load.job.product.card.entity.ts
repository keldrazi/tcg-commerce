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
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
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
    @Column({ default: 0 })
    inventoryBatchLoadJobProductCardCount: number;
    @CreateDateColumn()
    inventoryBatchLoadJobProductCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryBatchLoadJobProductCardUpdateDate: Date;
}