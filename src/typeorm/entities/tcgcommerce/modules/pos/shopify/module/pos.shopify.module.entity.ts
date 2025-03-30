import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('serviceShopifyModule')
export class ServiceShopifyModule {
    @PrimaryGeneratedColumn('uuid')
    serviceShopifyModuleId: string;

    @Column()
    moduleId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    serviceShopifyModuleStoreName: string;

    @Column()
    serviceShopifyModuleAccessToken: string;

    @CreateDateColumn()
    serviceShopifyModuleCreateDate: Date;

    @UpdateDateColumn()
    serviceShopifyModuleUpdateDate: Date; 

} 