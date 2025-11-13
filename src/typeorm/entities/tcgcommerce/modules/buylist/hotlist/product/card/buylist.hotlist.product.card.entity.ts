import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistHotlistProductCard')
export class BuylistHotlistProductCard {
    @PrimaryGeneratedColumn('uuid')
    buylistHotlistProductCardId: string;
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
    buylistHotlistProductCardCode: string;
    @Column()
    buylistHotlistProductCardStartDateTime: Date;
    @Column()
    buylistHotlistProductCardEndDateTime: Date;
    @Column({default: false})
    buylistHotlistProductCardIsExternal: boolean;
    @CreateDateColumn()
    buylistHotlistProductCardCreateDate: Date;
    @UpdateDateColumn()
    buylistHotlistProductCardUpdateDate: Date; 
}