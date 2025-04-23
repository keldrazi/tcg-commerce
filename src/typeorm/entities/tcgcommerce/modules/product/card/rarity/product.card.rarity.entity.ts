import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardVariant')
export class ProductCardVariant {
    @PrimaryGeneratedColumn('uuid')
    productCardVariantId: string;

    @Column()
    productCardVariantName: string;

    @Column()
    productCardVariantAbbreviation: string;

    @Column({type: 'boolean', default: false})
    productCardVariantIsActive: boolean;

    @CreateDateColumn()
    productCardVariantCreateDate: Date;

    @UpdateDateColumn()
    productCardVariantUpdateDate: Date; 

}