import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceChangeYearly')
export class TCGdbMTGPriceChangeYearly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceChangeYearlyId: string;
    @Column()
    tcgdbMTGCardId: string;
    @Column()
    tcgdbMTGPriceChangeYearlyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGPriceChangeYearlySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeYearlyMarketPricePercentage: number;
    @Column()
    tcgdbMTGPriceChangeYearlySubTypeName: string;
    @CreateDateColumn()
    tcgdbMTGPriceChangeYearlyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPriceChangeYearlyUpdateDate: Date; 

} 