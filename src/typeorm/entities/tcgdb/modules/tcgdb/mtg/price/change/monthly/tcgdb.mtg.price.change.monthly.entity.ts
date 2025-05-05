import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceChangeMonthly')
export class TCGdbMTGPriceChangeMonthly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceChangeMonthlyId: string;
    
    @Column()
    tcgdbMTGCardId: string;

    @Column()
    tcgdbMTGPriceChangeMonthlyTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbMTGPriceChangeMonthlySetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyCurrentLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyPreviousLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyLowPriceDifference: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyLowPricePercentage: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyCurrentMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyPreviousMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyMidPriceDifference: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyMidPricePercentage: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyCurrentHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyPreviousHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyHighPriceDifference: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyHighPricePercentage: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyCurrentMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyPreviousMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyMarketPriceDifference: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceChangeMonthlyMarketPricePercentage: number;

    @Column()
    tcgdbMTGPriceChangeMonthlySubTypeName: string;

    @CreateDateColumn()
    tcgdbMTGPriceChangeMonthlyCreateDate: Date;

    @UpdateDateColumn()
    tcgdbMTGPriceChangeMonthlyUpdateDate: Date; 

} 