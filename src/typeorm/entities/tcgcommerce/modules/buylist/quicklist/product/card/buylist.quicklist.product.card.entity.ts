import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistQuicklistProductCard')
export class BuylistQuicklistProductCard {
    @PrimaryGeneratedColumn('uuid')
    buylistQuicklistProductCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceUserId: string;
    @Column()
    buylistLocationId: string;
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
    buylistQuicklistProductCardCode: string;
    @Column({default: true})
    buylistQuicklistProductCardIsActive: boolean;
    @CreateDateColumn()
    buylistQuicklistProductCardCreateDate: Date;
    @UpdateDateColumn()
    buylistQuicklistProductCardUpdateDate: Date; 
}