import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('emailModule')
export class EmailModule {
    @PrimaryGeneratedColumn('uuid')
    emailModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    emailModuleSettings: string;
    @Column('jsonb')
    emailModuleRoles: string;
    @Column({type: 'boolean', default: false})
    emailModuleIsActive: boolean;
    @CreateDateColumn()
    emailModuleCreateDate: Date;
    @UpdateDateColumn()
    emailModuleUpdateDate: Date; 

} 