import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardOption')
export class ProductCardType {
    @PrimaryGeneratedColumn('uuid')
    ProductCardOptionId: string;

    @Column()
    ProductCardType: string;

    @Column()
    ProductCardOptionName: string;

    @CreateDateColumn()
    ProductCardOptionCreateDate: Date;

    @UpdateDateColumn()
    ProductCardOptionUpdateDate: Date; 

}