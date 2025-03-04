import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pricingModule')
export class PricingModule {
    @PrimaryGeneratedColumn('uuid')
    pricingModuleId: string;

    @Column()
    moduleId: string;

    @Column()
    commerceAccountId: string;

    @CreateDateColumn()
    pricingModuleCreateDate: Date;

    @UpdateDateColumn()
    pricingModuleUpdateDate: Date; 

} 