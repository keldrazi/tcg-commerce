import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistPaymentType')
export class BuylistPaymentType {
    @PrimaryGeneratedColumn('uuid')
    buylistPaymentTypeId: string;
    @Column()
    buylistPaymentTypeName: string;
    @Column({nullable: true})
    buylistPaymentTypeCode: string;
    @Column({type: 'boolean', default: false})
    buylistPaymentTypeIsActive: boolean;
    @CreateDateColumn()
    buylistPaymentTypeCreateDate: Date;
    @UpdateDateColumn()
    buylistPaymentTypeUpdateDate: Date; 
}