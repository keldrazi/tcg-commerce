import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceChangeWeekly')
export class ReportPriceChangeWeekly {
    @PrimaryGeneratedColumn('uuid')
    reportPriceChangeWeeklyId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportTypeId: string;
    @Column()
    reportPriceChangeWeeklyName: string;
    @Column()
    reportPriceChangeWeeklyDescription: string;
    @Column('jsonb')
    reportPriceChangeWeeklyCategories: string;
    @Column('jsonb')
    reportPriceChangeWeeklyDefaultSettings: string;
    @Column({type: 'boolean', default: false})
    reportPriceChangeWeeklyIsActive: boolean;
    @CreateDateColumn()
    reportPriceChangeWeeklyCreateDate: Date;
    @UpdateDateColumn()
    reportPriceChangeWeeklyUpdateDate: Date; 
} 