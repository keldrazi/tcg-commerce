import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productModule')
export class ProductModule {
    @PrimaryGeneratedColumn('uuid')
    productModuleId: string;

    @Column()
    moduleId: string;

    @Column()
    commerceAccountId: string;

    @Column('jsonb')
    productModuleSettings: string;

    @Column('jsonb')
    productModuleRoles: string;
    
    @Column({type: 'boolean', default: false})
    productModuleIsActive: boolean;

    @CreateDateColumn()
    productModuleCreateDate: Date;

    @UpdateDateColumn()
    productModuleUpdateDate: Date; 

} 