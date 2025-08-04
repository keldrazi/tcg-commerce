import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importProductCard')
export class ImportProductCard {
    @PrimaryGeneratedColumn('uuid')
    importProductCardId: string;
    @Column()
    importJobCardId: string;
    @Column()
    importProductCardTCGdbId: string;
    @Column()
    importProductCardSetName: string;
    @Column()
    importProductCardSetCode: string;
    @Column()
    importProductCardName: string;
    @Column()
    importProductCardCondition: string;
    @Column()
    importProductCardPrinting: string;
    @Column()
    importProductCardQty: number;
    @Column({type: 'decimal'})
    importProductCardPriceLow: number;
    @Column({type: 'decimal'})
    importProductCardPriceMarket: number;
    @CreateDateColumn()
    importProductCardCreateDate: Date;
    @UpdateDateColumn()
    importProductCardUpdateDate: Date; 

}