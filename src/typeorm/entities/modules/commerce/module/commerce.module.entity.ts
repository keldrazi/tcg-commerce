import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceModule')
export class CommerceModule {
    @PrimaryGeneratedColumn('uuid')
    commerceModuleId: string;

    @Column()
    commerceModuleName: string;

    @Column()
    commerceModuleHandle: string;

    @Column('jsonb')
    commerceModuleHandleOptions: string;

    @Column('jsonb')
    commerceModuleRoles: string;
    
    @Column({type: 'boolean', default: false})
    commerceModuleIsActive: boolean;

    @CreateDateColumn()
    commerceModuleCreateDate: Date;

    @UpdateDateColumn()
    commerceModuleUpdateDate: Date; 

} 