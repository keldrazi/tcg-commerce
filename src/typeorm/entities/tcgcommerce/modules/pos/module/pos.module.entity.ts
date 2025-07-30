import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('posModule')
export class POSModule {
    @PrimaryGeneratedColumn('uuid')
    posModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    posModuleSettings: string;
    @Column('jsonb')
    posModuleRoles: string;
    @Column({type: 'boolean', default: false})
    posModuleIsActive: boolean;
    @CreateDateColumn()
    posModuleCreateDate: Date;
    @UpdateDateColumn()
    posModuleUpdateDate: Date; 

} 