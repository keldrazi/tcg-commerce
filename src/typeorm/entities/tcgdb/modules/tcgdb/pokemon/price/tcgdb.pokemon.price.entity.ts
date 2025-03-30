import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPrice')
export class TCGdbPokemonPrice {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceId: string;
    
    @Column()
    tcgdbPokemonCardId: string;

    @Column()
    tcgdbPokemonPriceTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbPokemonPriceSetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceDirectLowPrice: number;

    @Column()
    tcgdbPokemonPriceSubTypeName: string;

    @CreateDateColumn()
    tcgdbPokemonPriceCreateDate: Date;

    @UpdateDateColumn()
    tcgdbPokemonPriceUpdateDate: Date; 

} 