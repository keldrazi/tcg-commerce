import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeMonthly')
export class ReportPriceChangeMonthly {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeMonthlyId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportTypeId: string;
    @Column()
    reportPriceChangeMonthlyName: string;
    @Column()
    reportPriceChangeMonthlyDescription: string;
    @Column('jsonb')
    reportPriceChangeMonthlyCategories: string;
    @Column('jsonb')
    reportPriceChangeMonthlyDefaultSettings: string;
    @Column({type: 'boolean', default: false})
    reportPriceChangeMonthlyIsActive: boolean;
    @CreateDateColumn()
    reportPriceChangeMonthlyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeMonthlyUpdateDate: Date; 
} 