import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonSet')
export class TCGdbPokemonSet {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonSetId: string;

    @Column({nullable: true})
    tcgdbPokemonSetTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbPokemonSetPokemonTCGId: string;

    @Column()
    tcgdbPokemonSetName: string;

    @Column()
    tcgdbPokemonSetAbbreviation: string;

    @Column()
    tcgdbPokemonSetPublishedOn: Date;

    @Column({nullable: true})
    tcgdbPokemonSetTotalCards: number;

    @CreateDateColumn()
    tcgdbPokemonSetCreateDate: Date;

    @UpdateDateColumn()
    tcgdbPokemonSetUpdateDate: Date; 

} 