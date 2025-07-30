import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceHistory')
export class TCGdbMTGPriceHistory {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceHistoryId: string;

    @Column()
    tcgdbMTGCardId: string;
    @Column()
    tcgdbMTGPriceHistoryTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGPriceHistorySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHistoryLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHistoryMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHistoryHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHistoryMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceHistoryDirectLowPrice: number;
    @Column()
    tcgdbMTGPriceHistorySubTypeName: string;
    @CreateDateColumn()
    tcgdbMTGPriceHistoryCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPriceHistoryUpdateDate: Date; 

} 