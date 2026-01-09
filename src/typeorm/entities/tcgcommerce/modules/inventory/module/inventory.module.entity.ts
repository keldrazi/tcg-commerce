import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryModule')
export class InventoryModule {
    @PrimaryGeneratedColumn('uuid')
    inventoryModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    inventoryModuleSettings: string;
    @Column('jsonb')
    inventoryModuleRoles: string;
    @Column({type: 'boolean', default: false})
    inventoryModuleIsActive: boolean;
    @CreateDateColumn()
    inventoryModuleCreateDate: Date;
    @UpdateDateColumn()
    inventoryModuleUpdateDate: Date; 

} 