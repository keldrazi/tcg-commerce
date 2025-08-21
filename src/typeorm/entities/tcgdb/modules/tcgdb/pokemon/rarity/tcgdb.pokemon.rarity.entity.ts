import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonRarity')
export class TCGdbPokemonRarity {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonRarityId: string;
    @Column({nullable: true})
    tcgdbPokemonRarityTCGPlayerId: number;
    @Column()
    tcgdbPokemonRarityName: string;
    @Column()
    tcgdbPokemonRarityCode: string;
    @CreateDateColumn()
    tcgdbPokemonRarityCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonRarityUpdateDate: Date; 

} 