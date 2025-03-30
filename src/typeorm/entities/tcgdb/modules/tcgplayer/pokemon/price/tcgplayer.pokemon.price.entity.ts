import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('tcgPlayerPokemonPrice')
export class TCGPlayerPokemonPrice {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonPriceId: string;

    @Column()
    tcgPlayerPokemonPriceGroupId: number;

    @Column()
    tcgPlayerPokemonPriceProductId: number;

    @Column({type: 'decimal', nullable: true})
    tcgPlayerPokemonPriceLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgPlayerPokemonPriceMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgPlayerPokemonPriceHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgPlayerPokemonPriceMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgPlayerPokemonPriceDirectLowPrice: number;

    @Column()
    tcgPlayerPokemonPriceSubTypeName: string;

    @Column({type: 'boolean', default: false})
    tcgPlayerPokemonPriceIsProcessed: boolean;

    @CreateDateColumn()
    tcgPlayerPokemonPriceCreateDate: Date;

    @UpdateDateColumn()
    tcgPlayerPokemonPriceUpdateDate: Date; 

} 