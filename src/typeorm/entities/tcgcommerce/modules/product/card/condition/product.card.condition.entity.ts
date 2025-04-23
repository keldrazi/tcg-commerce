import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardCondition')
export class ProductCardCondition {
    @PrimaryGeneratedColumn('uuid')
    productCardConditionId: string;

    @Column()
    productCardConditionName: string;

    @Column()
    productCardConditionAbbreviation: string;

    @Column({type: 'boolean', default: false})
    productCardConditionIsActive: boolean;

    @CreateDateColumn()
    productCardConditionCreateDate: Date;

    @UpdateDateColumn()
    productCardConditionUpdateDate: Date; 

}