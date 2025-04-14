import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCard')
export class InventoryProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    commerceLocationId: string;
    
    @Column()
    productCardItemId: string;

    @Column()
    productCardOptionId: string;
    
    @Column()
    productCardVariantId: string;

    @Column()
    inventoryProductCardSKU: string;

    @Column()
    inventoryProductCardBarcode: string;

    @Column()
    inventoryProductCardQty: number;

    @Column()
    inventoryProductCardMaxQty: number;

    @Column()
    inventoryProductCardReserveQty: number;
    
    @Column({type: 'decimal'})
    inventoryProductCardPrice: number;

    @Column({type: 'boolean', default: false})
    inventoryProductCardOverridePriceEnabled: boolean;

    @Column({type: 'decimal'})
    inventoryProductCardOverridePrice: number;

    @Column('jsonb')
    inventoryProductCardMetadata: string

    @CreateDateColumn()
    inventoryProductCardCreateDate: Date;

    @UpdateDateColumn()
    inventoryProductCardUpdateDate: Date; 

}