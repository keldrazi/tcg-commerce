import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeDaily')
export class ReportPriceChangeDaily {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeDailyId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportPriceChangeDailyName: string;
    @Column()
    reportPriceChangeDailyDescription: string;
    @Column('jsonb')
    reportPriceChangeDailyCategories: string;
    @Column('jsonb')
    reportPriceChangeDailySettings: string;
    @CreateDateColumn()
    reportPriceChangeDailyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeDailyUpdateDate: Date; 
} 