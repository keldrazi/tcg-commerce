import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCard')
export class InventoryProductCard {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardId: string;
    @Column()
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    productSetId: string;
    @Column()
    productLanguageId: string;
    @Column({ default: false })
    inventoryProductCardIsVerified: boolean;
    @Column({ default: true })
    inventoryProductCardIsActive: boolean;
    @CreateDateColumn()
    inventoryProductCardCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardUpdateDate: Date; 

}