import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardLanguage')
export class ProductCardLanguage {
    @PrimaryGeneratedColumn('uuid')
    productCardLanguageId: string;
    @Column()
    productCardLanguageTCGdbId: string;
    @Column()
    productCardLanguageTCGPlayerId: number;
    @Column()
    productLineId: string;
    @Column()
    productCardLanguageName: string;
    @Column()
    productCardLanguageCode: string;
    @Column({type: 'boolean', default: false})
    productCardLanguageIsActive: boolean;
    @CreateDateColumn()
    productCardLanguageCreateDate: Date;
    @UpdateDateColumn()
    productCardLanguageUpdateDate: Date; 

}