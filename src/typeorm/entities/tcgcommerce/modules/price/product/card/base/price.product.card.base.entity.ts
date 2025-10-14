import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceProductCardBase')
export class PriceProductCardBase {
    @PrimaryGeneratedColumn('uuid')
    priceProductCardBaseId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    priceProductCardBaseOption: string;
    @Column()
    priceProductCardBaseNMPercentage: number;
    @Column()
    priceProductCardBaseLPPercentage: number
    @Column()
    priceProductCardBaseMPPercentage: number
    @Column()
    priceProductCardBaseHPPercentage: number
    @Column()
    priceProductCardBaseDMPercentage: number;
    @CreateDateColumn()
    priceProductCardBaseCreateDate: Date;
    @UpdateDateColumn()
    priceProductCardBaseUpdateDate: Date;

}