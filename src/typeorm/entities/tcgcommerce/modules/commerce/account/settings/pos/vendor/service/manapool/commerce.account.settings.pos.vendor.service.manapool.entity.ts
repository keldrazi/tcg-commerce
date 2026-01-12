import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccountSettingsPOSVendorServiceManaPool')
export class CommerceAccountSettingsPOSVendorServiceManaPool {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountSettingsPOSVendorServiceManaPoolId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceManaPoolEmail: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceManaPoolAccessToken: string;
    @Column({type: 'boolean', default: false})
    commerceAccountSettingsPOSVendorServiceManaPoolIsVerified: boolean;
    @CreateDateColumn()
    commerceAccountSettingsPOSVendorServiceManaPoolCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate: Date; 

} 