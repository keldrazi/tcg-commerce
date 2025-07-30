import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceModule')
export class CommerceModule {
    @PrimaryGeneratedColumn('uuid')
    commerceModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    commerceModuleSettings: string;
    @Column('jsonb')
    commerceModuleRoles: string;
    @Column({type: 'boolean', default: false})
    commerceModuleIsActive: boolean;
    @CreateDateColumn()
    commerceModuleCreateDate: Date;
    @UpdateDateColumn()
    commerceModuleUpdateDate: Date; 

} 