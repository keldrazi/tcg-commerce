import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardType')
export class ProductCardType {
    @PrimaryGeneratedColumn('uuid')
    productCardTypeId: string;

    @Column()
    productCardTypeName: string;

    @Column()
    productCardTypeVendor: string;

    @CreateDateColumn()
    productCardTypeCreateDate: Date;

    @UpdateDateColumn()
    productCardTypeUpdateDate: Date; 

}