import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardPrinting')
export class ProductCardPrinting {
    @PrimaryGeneratedColumn('uuid')
    productCardPrintingId: string;

    @Column()
    productCardPrintingName: string;

    @Column()
    productCardPrintingAbbreviation: string;

    @Column({type: 'boolean', default: false})
    productCardPrintingIsActive: boolean;

    @CreateDateColumn()
    productCardPrintingCreateDate: Date;

    @UpdateDateColumn()
    productCardPrintingUpdateDate: Date; 

}