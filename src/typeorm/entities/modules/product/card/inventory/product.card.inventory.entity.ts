import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardInventory')
export class ProductCardInventory {
    @PrimaryGeneratedColumn('uuid')
    ProductCardInventoryId: string;

    @Column()
    CommerceAccountId: string;
    
    @Column()
    ProductCardItemId: string;

    @Column()
    ProductCardOption: string;
    
    @Column()
    ProductCardVariant: string;

    @Column()
    ProductCardInventoryQty: number;
    
    @Column({type: 'decimal'})
    ProductCardInventoryPrice: number;

    @CreateDateColumn()
    ProductCardInventoryCreateDate: Date;

    @UpdateDateColumn()
    ProductCardInventoryUpdateDate: Date; 

}