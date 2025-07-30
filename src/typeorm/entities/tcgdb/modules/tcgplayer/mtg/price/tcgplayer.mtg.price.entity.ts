import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGPrice')
export class TCGPlayerMTGPrice {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGPriceId: string;
    @Column()
    tcgPlayerMTGPriceGroupId: number;
    @Column()
    tcgPlayerMTGPriceProductId: number;
    @Column({type: 'decimal', nullable: true})
    tcgPlayerMTGPriceLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgPlayerMTGPriceMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgPlayerMTGPriceHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgPlayerMTGPriceMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgPlayerMTGPriceDirectLowPrice: number;
    @Column()
    tcgPlayerMTGPriceSubTypeName: string;
    @Column({type: 'boolean', default: false})
    tcgPlayerMTGPriceIsProcessed: boolean;
    @CreateDateColumn()
    tcgPlayerMTGPriceCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerMTGPriceUpdateDate: Date; 

} 