import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccountSettingsPOSVendorServiceShopify')
export class CommerceAccountSettingsPOSVendorServiceShopify {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountSettingsPOSVendorServiceShopifyId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceShopifyStoreName: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceShopifyAccessToken: string;
    @Column({type: 'boolean', default: false})
    commerceAccountSettingsPOSVendorServiceShopifyIsVerified: boolean;
    @CreateDateColumn()
    commerceAccountSettingsPOSVendorServiceShopifyCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountSettingsPOSVendorServiceShopifyUpdateDate: Date; 

} 