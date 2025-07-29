import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryLoadJobCard')
export class InventoryLoadJobCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryLoadJobCardId: string;
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
    inventoryLoadJobCardSetCode: string;
    @Column()
    inventoryLoadJobCardDate: Date;
    @Column()
    inventoryLoadJobCardCode: string;
    @Column()
    inventoryLoadJobCardStatus: string;
    @Column('jsonb')
    inventoryLoadJobCardData: string;
    @CreateDateColumn()
    inventoryLoadJobCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryLoadJobCardUpdateDate: Date;
}