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
    tcgdbPokemonCardSetCode: string;
    @Column()
    tcgdbPokemonCardName: string;
    @Column()
    tcgdbPokemonCardCleanName: string;
    @Column()
    tcgdbPokemonCardImageURL: string;
    @Column('jsonb')
    tcgdbPokemonCardData: string;
    @Column('jsonb')
    tcgdbPokemonCardTCGPlayerSKUs: string
    @CreateDateColumn()
    tcgdbPokemonCardCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonCardUpdateDate: Date; 

} 