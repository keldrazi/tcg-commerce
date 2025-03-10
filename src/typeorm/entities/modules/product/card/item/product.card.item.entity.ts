import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardItem')
export class ProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    productCardItemId: string;

    @Column()
    commerceAccountId: string;
    
    @Column()
    productCardItemTCGdbId: string;

    @Column()
    productVendorName: string;

    @Column()
    productTypeName: string;
    
    @Column()
    productCardItemSetAbbreviation: string;

    @Column()
    productCardItemName: string;
    
    @Column()
    productCardItemCleanName: string;

    @Column()
    productCardItemImage: string;

    @Column('jsonb')
    productCardItemMetadata: string;

    @CreateDateColumn()
    productCardItemCreateDate: Date;

    @UpdateDateColumn()
    productCardItemUpdateDate: Date; 

}