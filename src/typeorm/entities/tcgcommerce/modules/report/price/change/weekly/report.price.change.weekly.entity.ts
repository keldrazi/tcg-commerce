import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeWeekly')
export class ReportPriceChangeWeekly {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeWeeklyId: string;
    @Column()
    reportTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportPriceChangeWeeklyName: string;
    @Column()
    reportPriceChangeWeeklyDescription: string;
    @Column('jsonb')
    reportPriceChangeWeeklyCategories: string;
    @Column('jsonb')
    reportPriceChangeWeeklySettings: string;
    @CreateDateColumn()
    reportPriceChangeWeeklyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeWeeklyUpdateDate: Date; 
} 