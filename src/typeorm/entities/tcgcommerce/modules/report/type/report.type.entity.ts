import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportType')
export class ReportType {
    @PrimaryGeneratedColumn('uuid')
    reportTypeId: string;
    @Column()
    reportTypeName: string;
    @Column()
    reportTypeCode: string;
    @Column({type: 'boolean', default: false})
    reportTypeIsActive: boolean;
    @CreateDateColumn()
    reportTypeCreateDate: Date;
    @UpdateDateColumn()
    reportTypeUpdateDate: Date; 
} 