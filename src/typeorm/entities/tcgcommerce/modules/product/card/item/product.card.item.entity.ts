import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardItem')
export class ProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    productCardItemId: string;

    @Column()
    productCardItemTCGdbId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineId: string;

    @Column()
    productTypeId: string;

    @Column()
    productSetId: string;

    @Column()
    productSetAbbreviation: string;

    @Column()
    productCardRarityAbbreviation: string;
    
    @Column()
    productCardItemNumber: string;

    @Column()
    productCardItemName: string;
    
    @Column()
    productCardItemCleanName: string;

    @Column()
    productCardItemImage: string;

    @Column({type: 'boolean', default: false})
    productCardItemIsPresale: boolean;

    @Column('jsonb')
    productCardItemExtendedData: string;

    @Column('jsonb')
    productCardItemMetadata: string;

    @Column('jsonb')
    productCardItemSKUs: string;

    @Column({type: 'boolean', default: true})
    productCardItemIsActive: boolean;

    @CreateDateColumn()
    productCardItemCreateDate: Date;

    @UpdateDateColumn()
    productCardItemUpdateDate: Date; 

}