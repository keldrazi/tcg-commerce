import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccountSettingsPOSVendorServiceTCGPlayer')
export class CommerceAccountSettingsPOSVendorServiceTCGPlayer {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountSettingsPOSVendorServiceTCGPlayerId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceAccountSettingsPOSVendorServiceTCGPlayerUsername: string;
    @Column({ nullable: true})
    commerceAccountSettingsPOSVendorServiceTCGPlayerStoreKey: string;
    @Column({type: 'boolean', default: false})
    commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified: boolean;
    @CreateDateColumn()
    commerceAccountSettingsPOSVendorServiceTCGPlayerCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountSettingsPOSVendorServiceTCGPlayerUpdateDate: Date; 

} 