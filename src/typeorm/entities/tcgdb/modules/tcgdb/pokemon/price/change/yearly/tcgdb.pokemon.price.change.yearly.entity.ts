import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceChangeYearly')
export class TCGdbPokemonPriceChangeYearly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceChangeYearlyId: string;
    @Column()
    tcgdbPokemonCardId: string;
    @Column()
    tcgdbPokemonPriceChangeYearlyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbPokemonPriceChangeYearlySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeYearlyMarketPricePercentage: number;
    @Column()
    tcgdbPokemonPriceChangeYearlySubTypeName: string;
    @CreateDateColumn()
    tcgdbPokemonPriceChangeYearlyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonPriceChangeYearlyUpdateDate: Date; 

} 