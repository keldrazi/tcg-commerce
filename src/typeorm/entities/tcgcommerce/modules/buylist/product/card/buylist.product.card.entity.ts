import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistProductCard')
export class BuylistProductCard {
    @PrimaryGeneratedColumn('uuid')
    buylistProductCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceUserId: string;
    @Column()
    customerAccountUserId: string;
    @Column()
    buylistLocationId: string;
    @Column()
    buylistLocationName: string
    @Column()
    buylistTypeId: string;
    @Column()
    buylistTypeName: string;
    @Column()
    buylistStatusId: string;
    @Column()
    buylistStatusName: string
    @Column()
    buylistPaymentTypeId: string;
    @Column()
    buylistPaymentTypeName: string
    @Column()
    buylistPaymentServiceId: string;
    @Column()
    buylistPaymentServiceName: string
    @Column()
    productVendorId: string;
    @Column()
    productVendorName: string;
    @Column()
    productVendorCode: string;
    @Column()
    productLineId: string;
    @Column()
    productLineName: string;
    @Column()
    productLineCode: string;
    @Column()
    productTypeId: string;
    @Column()
    productTypeName: string;
    @Column()
    productTypeCode: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    buylistProductCardCode: string;
    @Column({ default: 0 })
    buylistProductCardTotalCount: number;
    @Column({ default: 0 })
    buylistProductCardTotalQtyCount: number;
    @Column({type: 'decimal', default: 0})
    buylistProductCardTotalPrice: number
    @CreateDateColumn()
    buylistProductCardCreateDate: Date;
    @UpdateDateColumn()
    buylistProductCardUpdateDate: Date; 
}