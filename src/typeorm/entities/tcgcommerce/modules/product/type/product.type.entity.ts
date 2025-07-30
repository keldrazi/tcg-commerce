import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productType')
export class ProductType {
    @PrimaryGeneratedColumn('uuid')
    productTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeName: string;
    @Column({type: 'boolean', default: false})
    productTypeIsActive: boolean;
    @CreateDateColumn()
    productTypeCreateDate: Date;
    @UpdateDateColumn()
    productTypeUpdateDate: Date; 

}