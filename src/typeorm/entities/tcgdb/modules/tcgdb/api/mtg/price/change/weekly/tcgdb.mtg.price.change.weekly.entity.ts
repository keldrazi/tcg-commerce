import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceChangeWeekly')
export class TCGdbMTGPriceChangeWeekly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceChangeWeeklyId: string;
    @Column()
    tcgdbMTGCardId: string;
    @Column()
    tcgdbMTGPriceChangeWeeklyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGPriceChangeWeeklySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeWeeklyMarketPricePercentage: number;
    @Column()
    tcgdbMTGPriceChangeWeeklySubTypeName: string;
    @CreateDateColumn()
    tcgdbMTGPriceChangeWeeklyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPriceChangeWeeklyUpdateDate: Date; 

} 