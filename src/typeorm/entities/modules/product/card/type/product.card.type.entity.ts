import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardType')
export class ProductCardType {
    @PrimaryGeneratedColumn('uuid')
    ProductCardTypeId: string;

    @Column()
    ProductCardTypeName: string;

    @Column()
    ProductCardTypeVendor: string;

    @CreateDateColumn()
    ProductCardTypeCreateDate: Date;

    @UpdateDateColumn()
    ProductCardTypeUpdateDate: Date; 

}