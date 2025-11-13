import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistPaymentService')
export class BuylistPaymentService {
    @PrimaryGeneratedColumn('uuid')
    buylistPaymentServiceId: string;
    @Column()
    buylistPaymentServiceName: string;
    @Column({nullable: true})
    buylistPaymentServiceCode: string;
    @Column({type: 'boolean', default: false})
    buylistPaymentServiceIsActive: boolean;
    @CreateDateColumn()
    buylistPaymentServiceCreateDate: Date;
    @UpdateDateColumn()
    buylistPaymentServiceUpdateDate: Date; 
}