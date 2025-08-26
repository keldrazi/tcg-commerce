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
    commerceUserName: string;
    @Column()
    productVendorId: string;
    @Column()
    productVendorName: string;
    @Column()
    productLineId: string;
    @Column()
    productLineName: string;
    @Column()
    productLineCode: string;
    @Column()
    inventoryBatchLoadJobProductCardSetCode: string;
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