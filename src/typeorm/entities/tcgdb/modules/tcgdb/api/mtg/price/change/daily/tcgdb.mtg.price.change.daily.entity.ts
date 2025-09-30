import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceChangeDaily')
export class TCGdbMTGPriceChangeDaily {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceChangeDailyId: string;
    @Column()
    tcgdbMTGCardId: string;
    @Column()
    tcgdbMTGPriceChangeDailyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGPriceChangeDailySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeDailyMarketPricePercentage: number;
    @Column()
    tcgdbMTGPriceChangeDailySubTypeName: string;
    @CreateDateColumn()
    tcgdbMTGPriceChangeDailyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPriceChangeDailyUpdateDate: Date; 

} 