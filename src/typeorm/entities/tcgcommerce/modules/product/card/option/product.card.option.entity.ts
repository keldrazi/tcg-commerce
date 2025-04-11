import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardOption')
export class ProductCardOption {
    @PrimaryGeneratedColumn('uuid')
    productCardOptionId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineId: string;

    @Column()
    productTypeId: string;

    @Column()
    productCardOptionName: string;

    @Column({type: 'boolean', default: false})
    productCardOptionIsActive: boolean;

    @CreateDateColumn()
    productCardOptionCreateDate: Date;

    @UpdateDateColumn()
    productCardOptionUpdateDate: Date; 

}