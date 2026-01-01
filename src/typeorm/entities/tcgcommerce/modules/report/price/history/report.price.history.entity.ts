import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceHistory')
export class ReportPriceHistory {
    @PrimaryGeneratedColumn('uuid')
    reportPriceHistoryId: string;
    @Column()
    reportTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportPriceHistoryName: string;
    @Column()
    reportPriceHistoryDescription: string;
    @Column('jsonb')
    reportPriceHistoryCategories: string;
    @Column('jsonb')
    reportPriceHistorySettings: string;
    @CreateDateColumn()
    reportPriceHistoryCreateDate: Date;
    @UpdateDateColumn()
    reportPriceHistoryUpdateDate: Date; 
} 