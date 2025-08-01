import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerPokemonLanguage')
export class TCGPlayerPokemonLanguage {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonLangId: string;
    @Column()
    tcgPlayerPokemonLanguageId: number;
    @Column()
    tcgPlayerPokemonLanguageName: string;
    @Column()
    tcgPlayerPokemonLanguageCode: string;
    @CreateDateColumn()
    tcgPlayerPokemonLanguageCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerPokemonLanguageUpdateDate: Date; 

} 