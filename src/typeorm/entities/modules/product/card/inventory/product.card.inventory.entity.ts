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
    productLocationId: string;

    @Column()
    productCardOption: string;
    
    @Column()
    productCardVariant: string;

    @Column()
    productCardInventoryQty: number;
    
    @Column({type: 'decimal'})
    productCardInventoryPrice: number;

    @Column({type: 'boolean', default: false})
    productCardInventoryOverridePriceEnabled: boolean;

    @Column({type: 'decimal'})
    productCardInventoryOverridePrice: string;

    @Column('jsonb')
    productCardInventoryMetadata: string

    @CreateDateColumn()
    productCardInventoryCreateDate: Date;

    @UpdateDateColumn()
    productCardInventoryUpdateDate: Date; 

}