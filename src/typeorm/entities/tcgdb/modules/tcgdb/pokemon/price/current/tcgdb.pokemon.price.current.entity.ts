import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPriceCurrent')
export class TCGdbPokemonPriceCurrent {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPriceCurrentId: string;
    
    @Column()
    tcgdbPokemonCardId: string;

    @Column()
    tcgdbPokemonPriceCurrentTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbPokemonPriceCurrentSetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceCurrentLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceCurrentMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceCurrentHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceCurrentMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbPokemonPriceCurrentDirectLowPrice: number;

    @Column()
    tcgdbPokemonPriceCurrentSubTypeName: string;

    @CreateDateColumn()
    tcgdbPokemonPriceCurrentCreateDate: Date;

    @UpdateDateColumn()
    tcgdbPokemonPriceCurrentUpdateDate: Date; 

} 