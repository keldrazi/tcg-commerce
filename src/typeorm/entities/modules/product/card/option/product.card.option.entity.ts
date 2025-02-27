import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardOption')
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