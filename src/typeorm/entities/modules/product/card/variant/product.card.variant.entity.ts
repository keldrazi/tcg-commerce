import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardVariant')
export class ProductCardVariant {
    @PrimaryGeneratedColumn('uuid')
    productCardVariantId: string;

    @Column()
    productCardVariantName: string;

    @CreateDateColumn()
    productCardVariantCreateDate: Date;

    @UpdateDateColumn()
    productCardVariantUpdateDate: Date; 

}