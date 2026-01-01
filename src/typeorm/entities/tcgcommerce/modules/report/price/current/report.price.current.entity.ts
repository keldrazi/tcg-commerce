import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportPriceCurrent')
export class ReportPriceCurrent {
    @PrimaryGeneratedColumn('uuid')
    reportPriceCurrentId: string;
    @Column()
    reportTypeId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    reportPriceCurrentName: string;
    @Column()
    reportPriceCurrentDescription: string;
    @Column('jsonb')
    reportPriceCurrentCategories: string;
    @Column('jsonb')
    reportPriceCurrentSettings: string;
    @CreateDateColumn()
    reportPriceCurrentCreateDate: Date;
    @UpdateDateColumn()
    reportPriceCurrentUpdateDate: Date; 
} 