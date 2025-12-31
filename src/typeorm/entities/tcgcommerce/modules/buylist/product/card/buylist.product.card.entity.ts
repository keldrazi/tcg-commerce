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
    buylistTypeId: string;
    @Column()
    buylistPaymentTypeId: string;
    @Column()
    buylistPaymentServiceId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    buylistProductCardStatus: string;
    @Column()
    buylistProductCardCode: string;
    @Column()
    buylistProductCardDateTime: Date;
    @Column()
    buylistProductCardNotes: string;
    @Column('jsonb')
    buylistProductCardDetails: string;
    @Column()
    buylistProductCardTotalCount: number;
    @Column()
    buylistProductCardTotalQtyCount: number;
    @Column()
    buylistProductCardTotalPrice: number
    @CreateDateColumn()
    buylistProductCardCreateDate: Date;
    @UpdateDateColumn()
    buylistProductCardUpdateDate: Date; 
}