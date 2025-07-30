import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardPrinting')
export class ProductCardPrinting {
    @PrimaryGeneratedColumn('uuid')
    productCardPrintingId: string;
    @Column()
    productCardPrintingTCGPlayerId: number;
    @Column()
    productLineId: string;
    @Column()
    productCardPrintingName: string;
    @Column()
    productCardPrintingDisplayOrder: number;
    @Column({type: 'boolean', default: false})
    productCardPrintingIsActive: boolean;
    @CreateDateColumn()
    productCardPrintingCreateDate: Date;
    @UpdateDateColumn()
    productCardPrintingUpdateDate: Date; 

}