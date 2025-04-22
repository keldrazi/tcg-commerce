import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGPrinting')
export class TCGPlayerMTGPrinting {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGPrintId: string;

    @Column()
    tcgPlayerMTGPrintingId: number;

    @Column()
    tcgPlayerMTGPrintingName: string;

    @Column()
    tcgPlayerMTGPrintingDisplayOrder: number;

    @Column()
    tcgPlayerMTGPrintingModifiedOn: Date;

    @CreateDateColumn()
    tcgPlayerMTGPrintingCreateDate: Date;

    @UpdateDateColumn()
    tcgPlayerMTGPrintingUpdateDate: Date; 

} 