import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importModule')
export class ImportModule {
    @PrimaryGeneratedColumn('uuid')
    importModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    importModuleSettings: string;
    @Column('jsonb')
    importModuleRoles: string;
    @Column({type: 'boolean', default: false})
    importModuleIsActive: boolean;
    @CreateDateColumn()
    importModuleCreateDate: Date;
    @UpdateDateColumn()
    importModuleUpdateDate: Date; 

} 