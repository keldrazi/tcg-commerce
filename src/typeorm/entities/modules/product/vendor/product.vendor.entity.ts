import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productVendor')
export class ProductVendor {
    @PrimaryGeneratedColumn('uuid')
    productVendorId: string;

    @Column()
    productVendorName: string;

    @CreateDateColumn()
    productVendorCreateDate: Date;

    @UpdateDateColumn()
    productVendorUpdateDate: Date; 

}