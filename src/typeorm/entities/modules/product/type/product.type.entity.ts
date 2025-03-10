import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productType')
export class ProductType {
    @PrimaryGeneratedColumn('uuid')
    productTypeId: string;

    @Column()
    productVendorId: string;

    @Column()
    productTypeName: string;

    @CreateDateColumn()
    productTypeCreateDate: Date;

    @UpdateDateColumn()
    productTypeUpdateDate: Date; 

}