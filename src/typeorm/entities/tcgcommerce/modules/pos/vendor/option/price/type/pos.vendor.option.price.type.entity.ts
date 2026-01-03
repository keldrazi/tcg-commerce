import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('posVendorOptionPriceType')
export class POSVendorOptionPriceType {
    @PrimaryGeneratedColumn('uuid')
    posVendorOptionPriceTypeId: string;
    @Column()
    posVendorId: string;
    @Column()
    posVendorOptionPriceTypeName: string;
    @Column()
    posVendorOptionPriceTypeCode: string;
    @Column({type: 'boolean', default: false})
    posVendorOptionPriceTypeIsActive: boolean;
    @CreateDateColumn()
    posVendorOptionPriceTypeCreateDate: Date;
    @UpdateDateColumn()
    posVendorOptionPriceTypeUpdateDate: Date; 
}