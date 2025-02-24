import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardVariant')
export class ProductCardVariant {
    @PrimaryGeneratedColumn('uuid')
    ProductCardVariantId: string;

    @Column()
    ProductCardVariantName: string;

    @CreateDateColumn()
    ProductCardVariantCreateDate: Date;

    @UpdateDateColumn()
    ProductCardVariantUpdateDate: Date; 

}