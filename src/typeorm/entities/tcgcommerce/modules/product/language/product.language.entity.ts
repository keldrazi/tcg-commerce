import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productLanguage')
export class ProductLanguage {
    @PrimaryGeneratedColumn('uuid')
    productLanguageId: string;
    @Column()
    productLanguageTCGdbId: string;
    @Column()
    productLanguageTCGPlayerId: number;
    @Column()
    productLineId: string;
    @Column()
    productLanguageName: string;
    @Column()
    productLanguageCode: string;
    @Column({type: 'boolean', default: false})
    productLanguageIsActive: boolean;
    @CreateDateColumn()
    productLanguageCreateDate: Date;
    @UpdateDateColumn()
    productLanguageUpdateDate: Date; 

}