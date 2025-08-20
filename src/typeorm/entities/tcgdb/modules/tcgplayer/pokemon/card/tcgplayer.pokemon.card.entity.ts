import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('tcgPlayerPokemonCard')
export class TCGPlayerPokemonCard {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonCardId: string;
    @Column()
    tcgPlayerPokemonCardProductId: number;
    @Column()
    tcgPlayerPokemonCardGroupId: number;
    @Column({nullable: true})
    tcgPlayerPokemonCardSetCode: string;
    @Column()
    tcgPlayerPokemonCardName: string;
    @Column()
    tcgPlayerPokemonCardCleanName: string;
    @Column()
    tcgPlayerPokemonCardImageURL: string;
    @Column()
    tcgPlayerPokemonCardURL: string;
    @Column()
    tcgPlayerPokemonCardModifiedOn: Date;
    @Column('jsonb')
    tcgPlayerPokemonCardData: string;
    @Column('jsonb')
    tcgPlayerPokemonCardSKUs: string;
    @CreateDateColumn()
    tcgPlayerPokemonCardCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerPokemonCardUpdateDate: Date; 

} 