import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCard')
export class ProductCard {
    @PrimaryGeneratedColumn('uuid')
    productCardId: string;
    @Column()
    productCardTCGdbId: string;
    @Column()
    productCardTCGPlayerId: number;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    productCardRarityCode: string;
    @Column()
    productCardNumber: string;
    @Column()
    productCardName: string;
    @Column()
    productCardCleanName: string;
    @Column()
    productCardImage: string;
    @Column({type: 'boolean', default: false})
    productCardIsPresale: boolean;
    @Column('jsonb')
    productCardExtendedData: string;
    @Column('jsonb')
    productCardMetadata: string;
    @Column('jsonb')
    productCardSKUs: string;
    @Column({type: 'boolean', default: true})
    productCardIsActive: boolean;
    @CreateDateColumn()
    productCardCreateDate: Date;
    @UpdateDateColumn()
    productCardUpdateDate: Date;

}