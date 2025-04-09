import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceHistory')
export class TCGdbPokemonPriceHistory {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceHistoryId: string;
    
    @Column()
    tcgdbPokemonCardId: string;

    @Column()
    tcgdbPokemonPriceHistoryTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbPokemonPriceHistorySetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHistoryLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHistoryMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHistoryHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHistoryMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHistoryDirectLowPrice: number;

    @Column()
    tcgdbPokemonPriceHistorySubTypeName: string;

    @CreateDateColumn()
    tcgdbPokemonPriceHistoryCreateDate: Date;

    @UpdateDateColumn()
    tcgdbPokemonPriceHistoryUpdateDate: Date; 

} 