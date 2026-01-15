import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fullfilmentOrder')
export class FullfilmentOrder {
    @PrimaryGeneratedColumn('uuid')
    fullfilmentOrderId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    fullfilmentOrderTypeId: string;
    @Column()
    fullfilmentOrderTypeName: string;
    @Column()
    posVendorId: string;
    @Column()
    posVendorName: string;
    @Column()
    fullfilmentOrderCode: string;
    @Column()
    fullfilmentOrderDate: Date;
    @Column({type: 'jsonb'})
    fullfilmentOrderDetails: string;
    @Column({type: 'jsonb'})
    fullfilmentOrderItemDetails: string;
    @Column({default: 0})
    fullfilmentOrderItemTotal: number;
    @Column({type: 'decimal', default: 0})
    fullfilmentOrderPriceTotal: number;
    @CreateDateColumn()
    fullfilmentOrderCreateDate: Date;
    @UpdateDateColumn()
    fullfilmentOrderUpdateDate: Date; 
} 