import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPrinting')
export class TCGdbMTGPrinting {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPrintingId: string;
    @Column({nullable: true})
    tcgdbMTGPrintingTCGPlayerId: number;
    @Column()
    tcgdbMTGPrintingName: string;
    @Column()
    tcgdbMTGPrintingDisplayOrder: number;
    @CreateDateColumn()
    tcgdbMTGPrintingCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGPrintingUpdateDate: Date; 

} 