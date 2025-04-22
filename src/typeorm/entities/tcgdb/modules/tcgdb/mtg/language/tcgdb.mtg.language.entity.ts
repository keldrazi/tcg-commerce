import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGLanguage')
export class TCGdbMTGLanguage {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGLanguageId: string;

    @Column({nullable: true})
    tcgdbMTGLanguageTCGPlayerId: number;
 
    @Column()
    tcgdbMTGLanguageName: string;

    @Column()
    tcgdbMTGLanguageAbbreviation: string;

    @CreateDateColumn()
    tcgdbMTGLanguageCreateDate: Date;

    @UpdateDateColumn()
    tcgdbMTGLanguageUpdateDate: Date; 

} 