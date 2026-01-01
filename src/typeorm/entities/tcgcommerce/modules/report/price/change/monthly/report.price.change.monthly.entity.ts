import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeMonthly')
export class ReportPriceChangeMonthly {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeMonthlyId: string;
    @Column()
    reportTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportPriceChangeMonthlyName: string;
    @Column()
    reportPriceChangeMonthlyDescription: string;
    @Column('jsonb')
    reportPriceChangeMonthlyCategories: string;
    @Column('jsonb')
    reportPriceChangeMonthlySettings: string;
    @CreateDateColumn()
    reportPriceChangeMonthlyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeMonthlyUpdateDate: Date; 
} 