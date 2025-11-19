import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistModule')
export class BuylistModule {
    @PrimaryGeneratedColumn('uuid')
    buylistModuleId: string;
    @Column()
    applicationModuleId: string;
    @Column()
    commerceAccountId: string;
    @Column('jsonb')
    buylistModuleSettings: string;
    @Column('jsonb')
    buylistModuleRoles: string;
    @Column({type: 'boolean', default: false})
    buylistModuleIsActive: boolean;
    @CreateDateColumn()
    buylistModuleCreateDate: Date;
    @UpdateDateColumn()
    buylistModuleUpdateDate: Date; 

} 