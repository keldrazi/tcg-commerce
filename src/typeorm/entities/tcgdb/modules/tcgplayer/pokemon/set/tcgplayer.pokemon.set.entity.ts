import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('tcgPlayerPokemonSet')
export class TCGPlayerPokemonSet {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonSetId: string;
    @Column()
    tcgPlayerPokemonSetGroupId: number;
    @Column()
    tcgPlayerPokemonSetName: string;
    @Column()
    tcgPlayerPokemonSetAbbreviation: string;
    @Column()
    tcgPlayerPokemonSetIsSupplemental: boolean;
    @Column()
    tcgPlayerPokemonSetPublishedOn: Date;
    @Column()
    tcgPlayerPokemonSetModifiedOn: Date;
    @Column({nullable: true})
    tcgPlayerPokemonSetTotalCards: number;
    @CreateDateColumn()
    tcgPlayerPokemonSetCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerPokemonSetUpdateDate: Date; 

} 