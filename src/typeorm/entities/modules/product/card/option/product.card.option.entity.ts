import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardOption')
export class ProductCardOption {
    @PrimaryGeneratedColumn('uuid')
    ProductCardOptionId: string;

    @Column()
    ProductCardTypeName: string;

    @Column()
    ProductCardOptionName: string;

    @CreateDateColumn()
    ProductCardOptionCreateDate: Date;

    @UpdateDateColumn()
    ProductCardOptionUpdateDate: Date; 

}