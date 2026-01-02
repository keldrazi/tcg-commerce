import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('posVendorOptionPrice')
export class POSVendorOptionPrice {
    @PrimaryGeneratedColumn('uuid')
    posVendorOptionPriceId: string;
    @Column()
    posVendorId: string;
    @Column()
    posVendorOptionPriceName: string;
    @Column()
    posVendorOptionPriceCode: string;
    @Column({type: 'boolean', default: false})
    posVendorOptionPriceIsActive: boolean;
    @CreateDateColumn()
    posVendorOptionPriceCreateDate: Date;
    @UpdateDateColumn()
    posVendorOptionPriceUpdateDate: Date; 
}