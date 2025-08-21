import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceChangeDaily')
export class TCGdbPokemonPriceChangeDaily {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceChangeDailyId: string;
    @Column()
    tcgdbPokemonCardId: string;
    @Column()
    tcgdbPokemonPriceChangeDailyTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbPokemonPriceChangeDailySetCode: string;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyCurrentLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyPreviousLowPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyLowPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyLowPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyCurrentMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyPreviousMidPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyMidPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyMidPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyCurrentHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyPreviousHighPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyHighPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyHighPricePercentage: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyCurrentMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyPreviousMarketPrice: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyMarketPriceDifference: number;
    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceChangeDailyMarketPricePercentage: number;
    @Column()
    tcgdbPokemonPriceChangeDailySubTypeName: string;
    @CreateDateColumn()
    tcgdbPokemonPriceChangeDailyCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonPriceChangeDailyUpdateDate: Date; 

} 