import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productLine')
export class ProductLine {
    @PrimaryGeneratedColumn('uuid')
    productLineId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineName: string;

    @Column()
    productLineCode: string;

    @Column({type: 'boolean', default: false})
    productLineIsActive: boolean;

    @CreateDateColumn()
    productLineCreateDate: Date;

    @UpdateDateColumn()
    productLineUpdateDate: Date; 

}