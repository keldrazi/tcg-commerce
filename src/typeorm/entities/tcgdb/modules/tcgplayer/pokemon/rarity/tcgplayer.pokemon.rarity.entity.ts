import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerPokemonRarity')
export class TCGPlayerPokemonRarity {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonRarId: string;
    @Column()
    tcgPlayerPokemonRarityId: number;
    @Column()
    tcgPlayerPokemonRarityDisplayText: string;
    @Column()
    tcgPlayerPokemonRarityDBValue: string;
    @CreateDateColumn()
    tcgPlayerPokemonRarityCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerPokemonRarityUpdateDate: Date; 

} 