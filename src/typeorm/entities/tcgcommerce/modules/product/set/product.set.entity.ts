import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productSet')
export class ProductSet {
    @PrimaryGeneratedColumn('uuid')
    productSetId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productSetName: string;
    @Column()
    productSetCode: string;
    @Column()
    productSetReleaseDate: Date;
    @Column()
    productSetTotalCards: number;
    @Column({type: 'boolean', default: false})
    productSetIsActive: boolean;
    @CreateDateColumn()
    productSetCreateDate: Date;
    @UpdateDateColumn()
    productSetUpdateDate: Date; 

}