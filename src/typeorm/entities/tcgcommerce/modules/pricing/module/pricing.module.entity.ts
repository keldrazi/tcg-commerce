import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingModule')
export class PricingModule {
    @PrimaryGeneratedColumn('uuid')
    pricingModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    pricingModuleSettings: string;
    @Column('jsonb')
    pricingModuleRoles: string;
    @Column({type: 'boolean', default: false})
    pricingModuleIsActive: boolean;
    @CreateDateColumn()
    pricingModuleCreateDate: Date;
    @UpdateDateColumn()
    pricingModuleUpdateDate: Date; 

} 