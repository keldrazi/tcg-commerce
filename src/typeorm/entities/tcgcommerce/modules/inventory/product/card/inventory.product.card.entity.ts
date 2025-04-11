import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardInventory')
export class ProductCardInventory {
    @PrimaryGeneratedColumn('uuid')
    productCardInventoryId: string;

    @Column()
    commerceAccountId: string;
    
    @Column()
    productCardItemId: string;

    @Column()
    commerceLocationId: string;

    @Column()
    productCardOption: string;
    
    @Column()
    productCardVariant: string;

    @Column()
    productCardInventoryQty: number;

    @Column()
    productCardInventoryMaxQty: number;

    @Column()
    productCardInventoryReserveQty: number;
    
    @Column({type: 'decimal'})
    productCardInventoryPrice: number;

    @Column({type: 'boolean', default: false})
    productCardInventoryOverridePriceEnabled: boolean;

    @Column({type: 'decimal'})
    productCardInventoryOverridePrice: number;

    @Column('jsonb')
    productCardInventoryMetadata: string

    @CreateDateColumn()
    productCardInventoryCreateDate: Date;

    @UpdateDateColumn()
    productCardInventoryUpdateDate: Date; 

}