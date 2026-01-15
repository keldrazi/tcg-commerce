import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fullfilmentOrder')
export class FullfilmentOrder {
    @PrimaryGeneratedColumn('uuid')
    fullfilmentOrderId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    fullfilmentOrderTypeId: string;
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
    @Column()
    fullfilmentOrderItemTotal: number;
    @Column()
    fullfilmentOrderPriceTotal: number;
    @CreateDateColumn()
    fullfilmentModuleCreateDate: Date;
    @UpdateDateColumn()
    fullfilmentModuleUpdateDate: Date; 
} 