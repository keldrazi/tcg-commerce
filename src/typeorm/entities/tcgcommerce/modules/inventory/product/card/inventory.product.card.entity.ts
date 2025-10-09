import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCard')
export class InventoryProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardId: string;
    @Column()
    productCardId: string;
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
    productCardLanguageId: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column('jsonb')
    inventoryProductCardItems: string;
    @CreateDateColumn()
    inventoryProductCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardUpdateDate: Date; 

}