import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbPokemonPrinting')
export class TCGdbPokemonPrinting {
    @PrimaryGeneratedColumn('uuid')
    tcgdbPokemonPrintingId: string;
    @Column({nullable: true})
    tcgdbPokemonPrintingTCGPlayerId: number;
    @Column()
    tcgdbPokemonPrintingName: string;
    @Column()
    tcgdbPokemonPrintingDisplayOrder: number;
    @CreateDateColumn()
    tcgdbPokemonPrintingCreateDate: Date;
    @UpdateDateColumn()
    tcgdbPokemonPrintingUpdateDate: Date; 

} 