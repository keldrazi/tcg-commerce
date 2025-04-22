import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerPokemonPrinting')
export class TCGPlayerPokemonPrinting {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerPokemonPrintId: string;

    @Column()
    tcgPlayerPokemonPrintingId: number;

    @Column()
    tcgPlayerPokemonPrintingName: string;

    @Column()
    tcgPlayerPokemonPrintingDisplayOrder: number;

    @Column()
    tcgPlayerPokemonPrintingModifiedOn: Date;

    @CreateDateColumn()
    tcgPlayerPokemonPrintingCreateDate: Date;

    @UpdateDateColumn()
    tcgPlayerPokemonPrintingUpdateDate: Date; 

} 