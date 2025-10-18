import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceBatchUpdateProductCard')
export class PriceBatchUpdateProductCard {
    @PrimaryGeneratedColumn('uuid')
    priceBatchUpdateProductCardId: string;
    @Column()
    priceBatchUpdateJobProductCardId: string;
    @Column()
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
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    productCardPrintingId: string;
    @Column()
    productCardPrintingName: string;
    @Column('jsonb')
    priceBatchUpdateProductCardItems: string;
    @CreateDateColumn()
    priceBatchUpdateProductCardCreateDate: Date;
    @UpdateDateColumn()
    priceBatchUpdateProductCardUpdateDate: Date; 
}