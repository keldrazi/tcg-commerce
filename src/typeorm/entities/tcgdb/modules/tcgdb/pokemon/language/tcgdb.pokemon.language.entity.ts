import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonLanguage')
export class TCGdbPokemonLanguage {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonLanguageId: string;
    @Column({nullable: true})
    tcgdbPokemonLanguageTCGPlayerId: number;
    @Column()
    tcgdbPokemonLanguageName: string;
    @Column()
    tcgdbPokemonLanguageCode: string;
    @CreateDateColumn()
    tcgdbPokemonLanguageCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonLanguageUpdateDate: Date; 

} 