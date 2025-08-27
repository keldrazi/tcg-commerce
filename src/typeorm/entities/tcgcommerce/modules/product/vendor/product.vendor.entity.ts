import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productVendor')
export class ProductVendor {
    @PrimaryGeneratedColumn('uuid')
    productVendorId: string;
    @Column({ nullable: true })
    productVendorName: string;
    @Column({ nullable: true })
    productVendorCode: string;
    @Column({type: 'boolean', default: false})
    productVendorIsActive: boolean;
    @CreateDateColumn()
    productVendorCreateDate: Date;
    @UpdateDateColumn()
    productVendorUpdateDate: Date; 

}