import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardOption')
export class ProductCardOption {
    @PrimaryGeneratedColumn('uuid')
    productCardOptionId: string;

    @Column()
    productCardTypeName: string;

    @Column()
    productCardOptionName: string;

    @CreateDateColumn()
    productCardOptionCreateDate: Date;

    @UpdateDateColumn()
    productCardOptionUpdateDate: Date; 

}