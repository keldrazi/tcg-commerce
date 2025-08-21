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
    tcgdbPokemonCardSetName: string;
    @Column({nullable: true})
    tcgdbPokemonCardSetCode: string;
    @Column({nullable: true})
    tcgdbPokemonCardRarityCode: string;
    @Column({nullable: true})
    tcgdbPokemonCardNumber: string;
    @Column()
    tcgdbPokemonCardName: string;
    @Column()
    tcgdbPokemonCardCleanName: string;
    @Column()
    tcgdbPokemonCardImageURL: string;
    @Column('jsonb')
    tcgdbPokemonCardTCGPlayerData: string;
    @Column('jsonb')
    tcgdbPokemonCardTCGPlayerSKUs: string
    @Column('jsonb')
    tcgdbPokemonCardPokemonTCGData: string;
    @CreateDateColumn()
    tcgdbPokemonCardCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonCardUpdateDate: Date; 

} 