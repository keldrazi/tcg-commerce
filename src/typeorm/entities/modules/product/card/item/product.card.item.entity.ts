import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardItem')
export class ProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    productCardItemId: string;

    @Column()
    commerceAccountId: string;
    
    @Column()
    productCardItemTCGdbId: string;

    @Column()
    productCardTypeName: string;
    
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