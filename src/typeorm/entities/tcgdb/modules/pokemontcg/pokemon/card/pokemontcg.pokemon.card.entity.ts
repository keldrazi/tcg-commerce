import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('pokemonTCGPokemonCard')
export class PokemonTCGPokemonCard {
    @PrimaryGeneratedColumn('uuid')
    pokemonTCGPokemonCardId: string;
    @Column()
    pokemonTCGPokemonCardPokemonTCGId: string;
    @Column({nullable: true})
    pokemonTCGPokemonCardTCGPlayerId: number;
    @Column()
    pokemonTCGPokemonCardSetId: string;
    @Column()
    pokemonTCGPokemonCardName: string;
    @Column()
    pokemonTCGPokemonCardSupertype: string;
    @Column('jsonb')
    pokemonTCGPokemonCardData: string;
    @CreateDateColumn()
    pokemonTCGPokemonCardCreateDate: Date;
    @UpdateDateColumn()
    pokemonTCGPokemonCardUpdateDate: Date; 

} 