import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceChangeMonthly')
export class TCGdbPokemonPriceChangeMonthly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceChangeMonthlyId: string;
    @Column()
    tcgdbPokemonCardId: string;
    @Column()
    tcgdbPokemonPriceChangeMonthlyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbPokemonPriceChangeMonthlySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeMonthlyMarketPricePercentage: number;
    @Column()
    tcgdbPokemonPriceChangeMonthlySubTypeName: string;
    @CreateDateColumn()
    tcgdbPokemonPriceChangeMonthlyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonPriceChangeMonthlyUpdateDate: Date; 

} 