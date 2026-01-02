import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('orderModule')
export class OrderModule {
    @PrimaryGeneratedColumn('uuid')
    orderModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    orderAccountId: string;
    @Column('jsonb')
    orderModuleSettings: string;
    @Column('jsonb')
    orderModuleRoles: string;
    @Column({type: 'boolean', default: false})
    orderModuleIsActive: boolean;
    @CreateDateColumn()
    orderModuleCreateDate: Date;
    @UpdateDateColumn()
    orderModuleUpdateDate: Date; 
} 