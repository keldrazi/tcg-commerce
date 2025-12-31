import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('customerModule')
export class CustomerModule {
    @PrimaryGeneratedColumn('uuid')
    customerModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    customerModuleSettings: string;
    @Column('jsonb')
    customerModuleRoles: string;
    @Column({type: 'boolean', default: false})
    customerModuleIsActive: boolean;
    @CreateDateColumn()
    customerModuleCreateDate: Date;
    @UpdateDateColumn()
    customerModuleUpdateDate: Date; 
} 