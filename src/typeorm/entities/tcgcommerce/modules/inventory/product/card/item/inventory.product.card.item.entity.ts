import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardItem')
export class InventoryProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardItemId: string;
    @Column()
    inventoryProductCardId: string;
    @Column()
    productCardPrintingId: string;
    @Column()
    productCardPrintingName: string;
    @Column()
    productCardConditionId: string;
    @Column()
    productCardConditionCode: string;
    @Column()
    inventoryProductCardItemTCGPlayerSKU: number;
    @Column({ nullable: true })
    inventoryProductCardItemSKU: string;
    @Column({ default: 0 })
    inventoryProductCardItemTCGPlayerQty: number;
    @Column({ default: 0 })
    inventoryProductCardItemQty: number;
    @Column({ default: 0 })
    inventoryProductCardItemTotalQty: number;
    @Column({ default: 0 })
    inventoryProductCardItemMaxQty: number;
    @Column({ default: 0 })
    inventoryProductCardItemReserveQty: number;
    @Column({ default: 0 })
    inventoryProductCardItemPrice: number;
    @Column({ default: 0 })
    inventoryProductCardItemCost: number;
    @Column({ default: false })
    inventoryProductCardItemOverridePriceEnabled: boolean;
    @Column({ default: 0 })
    inventoryProductCardItemOverridePrice: number;
    @CreateDateColumn()
    inventoryProductCardItemCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardItemUpdateDate: Date; 
}
