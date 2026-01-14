import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccountSettingsPOSVendorServiceTCGPlayer')
export class CommerceAccountSettingsPOSVendorServiceTCGPlayer {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountSettingsPOSVendorServiceTCGPlayerId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceTCGPlayerAuthorizationCode: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerAccessToken: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerDisplayName: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerSellerKey: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenIssued: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires: string;
    @Column({type: 'boolean', default: false})
    commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified: boolean;
    @CreateDateColumn()
    commerceAccountSettingsPOSVendorServiceTCGPlayerCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountSettingsPOSVendorServiceTCGPlayerUpdateDate: Date; 
} 