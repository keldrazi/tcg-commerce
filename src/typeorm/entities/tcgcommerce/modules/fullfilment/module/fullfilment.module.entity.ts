import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fullfilmentModule')
export class FullfilmentModule {
    @PrimaryGeneratedColumn('uuid')
    fullfilmentModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    fullfilmentModuleSettings: string;
    @Column('jsonb')
    fullfilmentModuleRoles: string;
    @Column({type: 'boolean', default: false})
    fullfilmentModuleIsActive: boolean;
    @CreateDateColumn()
    fullfilmentModuleCreateDate: Date;
    @UpdateDateColumn()
    fullfilmentModuleUpdateDate: Date; 
} 