import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPricePreviousDaily')
export class TCGdbMTGPricePreviousDaily {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPricePreviousDailyId: string;
    @Column()
    tcgdbMTGCardId: string;
    @Column()
    tcgdbMTGPricePreviousDailyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGPricePreviousDailySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPricePreviousDailyLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPricePreviousDailyMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPricePreviousDailyHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPricePreviousDailyMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPricePreviousDailyDirectLowPrice: number;
    @Column()
    tcgdbMTGPricePreviousDailySubTypeName: string;
    @CreateDateColumn()
    tcgdbMTGPricePreviousDailyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPricePreviousDailyUpdateDate: Date; 

} 