import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeYearly')
export class ReportPriceChangeYearly {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeYearlyId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportTypeId: string;
    @Column()
    reportPriceChangeYearlyName: string;
    @Column()
    reportPriceChangeYearlyDescription: string;
    @Column('jsonb')
    reportPriceChangeYearlyCategories: string;
    @Column('jsonb')
    reportPriceChangeYearlyDefaultSettings: string;
    @Column({type: 'boolean', default: false})
    reportPriceChangeYearlyIsActive: boolean;
    @CreateDateColumn()
    reportPriceChangeYearlyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeYearlyUpdateDate: Date; 
} 