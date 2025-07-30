import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGLanguage')
export class TCGPlayerMTGLanguage {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGLangId: string;
    @Column()
    tcgPlayerMTGLanguageId: number;
    @Column()
    tcgPlayerMTGLanguageName: string;
    @Column()
    tcgPlayerMTGLanguageCode: string;
    @CreateDateColumn()
    tcgPlayerMTGLanguageCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerMTGLanguageUpdateDate: Date; 

} 