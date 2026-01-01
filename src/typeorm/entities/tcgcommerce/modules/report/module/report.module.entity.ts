import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('reportModule')
export class ReportModule {
    @PrimaryGeneratedColumn('uuid')
    reportModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    reportModuleSettings: string;
    @Column('jsonb')
    reportModuleRoles: string;
    @Column({type: 'boolean', default: false})
    reportModuleIsActive: boolean;
    @CreateDateColumn()
    reportModuleCreateDate: Date;
    @UpdateDateColumn()
    reportModuleUpdateDate: Date; 

} 