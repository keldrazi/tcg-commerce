import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPrice')
export class TCGdbMTGPrice {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceId: string;
    
    @Column()
    tcgdbMTGCardId: string;

    @Column()
    tcgdbMTGPriceTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbMTGPriceSetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceDirectLowPrice: number;

    @Column()
    tcgdbMTGPriceSubTypeName: string;

    @CreateDateColumn()
    tcgdbMTGPriceCreateDate: Date;

    @UpdateDateColumn()
    tcgdbMTGPriceUpdateDate: Date; 

} 