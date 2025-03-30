import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonCard')
export class TCGdbPokemonCard {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonCardId: string;

    @Column({nullable: true})
    tcgdbPokemonCardTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbPokemonCardPokemonTCGId: string;

    @Column({nullable: true})
    tcgdbPokemonCardSetAbbreviation: string;

    @Column()
    tcgdbPokemonCardName: string;

    @Column()
    tcgdbPokemonCardCleanName: string;

    @Column()
    tcgdbPokemonCardImageURL: string;

    @Column('jsonb')
    tcgdbPokemonCardExtendedData: string;

    @Column('jsonb')
    tcgdbPokemonCardTCGPlayerSKUs: string

    @CreateDateColumn()
    tcgdbPokemonCardCreateDate: Date;

    @UpdateDateColumn()
    tcgdbPokemonCardUpdateDate: Date; 

} 