import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceProductCardType')
export class PriceProductCardType {
    @PrimaryGeneratedColumn('uuid')
    priceProductCardTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    priceProductCardTypeName: string;
    @Column()
    priceProductCardTypeDescription: string;
    @Column({type: 'boolean', default: false})
    priceProductCardTypeIsActive: boolean;
    @CreateDateColumn()
    priceProductCardTypeCreateDate: Date;
    @UpdateDateColumn()
    priceProductCardTypeUpdateDate: Date;

}