import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonCondition')
export class TCGdbPokemonCondition {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonConditionId: string;
    @Column({nullable: true})
    tcgdbPokemonConditionTCGPlayerId: number;
    @Column()
    tcgdbPokemonConditionName: string;
    @Column()
    tcgdbPokemonConditionCode: string;
    @Column({type: 'decimal'})
    tcgdbPokemonConditionPriceFactor: number;
    @Column()
    tcgdbPokemonConditionDisplayOrder: number;
    @CreateDateColumn()
    tcgdbPokemonConditionCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonConditionUpdateDate: Date; 

} 