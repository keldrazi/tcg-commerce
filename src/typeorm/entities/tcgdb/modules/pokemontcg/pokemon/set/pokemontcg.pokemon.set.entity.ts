import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('pokemonTCGPokemonSet')
export class PokemonTCGPokemonSet {
    @PrimaryGeneratedColumn('uuid')
    pokemonTCGPokemonSetId: string;

    @Column()
    pokemonTCGPokemonSetPokemonTCGId: string;

    @Column({nullable: true})
    pokemonTCGPokemonSetTCGPlayerId: number;

    @Column()
    pokemonTCGPokemonSetName: string;

    @Column()
    pokemonTCGPokemonSetSeries: string;

    @Column()
    pokemonTCGPokemonSetPrintedTotal: number;

    @Column()
    pokemonTCGPokemonSetTotal: number;

    @Column({nullable: true})
    pokemonTCGPokemonSetPtcgoCode: string;

    @Column()
    pokemonTCGPokemonSetReleaseDate: Date;

    @Column()
    pokemonTCGPokemonSetSymbolImage: string;

    @Column()
    pokemonTCGPokemonSetLogoImage: string;

    @Column()
    pokemonTCGPokemonSetSearchURI: string;

    @Column('jsonb')
    pokemonTCGPokemonSetData: string;

    @CreateDateColumn()
    pokemonTCGPokemonSetCreateDate: Date;

    @UpdateDateColumn()
    pokemonTCGPokemonSetUpdateDate: Date; 

} 