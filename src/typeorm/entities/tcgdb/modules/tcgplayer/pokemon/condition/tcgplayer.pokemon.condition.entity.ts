import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerPokemonCondition')
export class TCGPlayerPokemonCondition {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonCondId: string;
    @Column()
    tcgPlayerPokemonConditionId: number;
    @Column()
    tcgPlayerPokemonConditionName: string;
    @Column()
    tcgPlayerPokemonConditionCode: string;
    @Column()
    tcgPlayerPokemonConditionDisplayOrder: number;
    @CreateDateColumn()
    tcgPlayerPokemonConditionCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerPokemonConditionUpdateDate: Date; 

} 