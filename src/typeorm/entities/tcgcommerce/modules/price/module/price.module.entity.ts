import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('priceModule')
export class PriceModule {
    @PrimaryGeneratedColumn('uuid')
    priceModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    priceModuleSettings: string;
    @Column('jsonb')
    priceModuleRoles: string;
    @Column({type: 'boolean', default: false})
    priceModuleIsActive: boolean;
    @CreateDateColumn()
    priceModuleCreateDate: Date;
    @UpdateDateColumn()
    priceModuleUpdateDate: Date; 

} 