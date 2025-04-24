import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardLanguage')
export class ProductCardLanguage {
    @PrimaryGeneratedColumn('uuid')
    productCardLanguageId: string;

    @Column()
    productLineId: string;

    @Column()
    productCardLanguageName: string;

    @Column()
    productCardLanguageAbbreviation: string;

    @Column({type: 'boolean', default: false})
    productCardLanguageIsActive: boolean;

    @CreateDateColumn()
    productCardLanguageCreateDate: Date;

    @UpdateDateColumn()
    productCardLanguageUpdateDate: Date; 

}