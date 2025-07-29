import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCard')
export class InventoryProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    commerceLocationId: string;
    
    @Column()
    productCardItemId: string;

    @Column()
    productSetAbbreviation: string;

    @Column()
    productCardPrintingName: string;
    
    @Column()
    productCardConditionAbbreviation: string;

    @Column()
    productCardLanguageAbbreviation: string;

    @Column({ nullable: true })
    inventoryProductCardSKU: string;

    @Column({ nullable: true })
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
    inventoryProductCardMetadata: string;

    @CreateDateColumn()
    inventoryProductCardCreateDate: Date;

    @UpdateDateColumn()
    inventoryProductCardUpdateDate: Date; 

}