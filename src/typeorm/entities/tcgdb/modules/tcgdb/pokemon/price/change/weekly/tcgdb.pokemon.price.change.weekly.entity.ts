import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceChangeWeekly')
export class TCGdbPokemonPriceChangeWeekly {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceChangeWeeklyId: string;
    @Column()
    tcgdbPokemonCardId: string;
    @Column()
    tcgdbPokemonPriceChangeWeeklyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbPokemonPriceChangeWeeklySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeWeeklyMarketPricePercentage: number;
    @Column()
    tcgdbPokemonPriceChangeWeeklySubTypeName: string;
    @CreateDateColumn()
    tcgdbPokemonPriceChangeWeeklyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonPriceChangeWeeklyUpdateDate: Date; 

} 