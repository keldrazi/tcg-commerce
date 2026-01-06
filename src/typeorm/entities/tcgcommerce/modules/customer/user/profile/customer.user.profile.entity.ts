import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('customerUserProfile')
export class CustomerUserProfile {
    @PrimaryGeneratedColumn('uuid')
    customerUserProfileId: string;
    @Column()
    customerUserId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    customerUserProfileFirstName: string;
    @Column()
    customerUserProfileLastName: string;
    @Column()
    customerUserProfileShippingAddressPrimary: string;
    @Column()
    customerUserProfileShippingAddressSecondary: string;
    @Column()
    customerUserProfileShippingAddressCity: string
    @Column()
    customerUserProfileShippingAddressState: string
    @Column()
    customerUserProfileShippingAddressZip: string
    @Column()
    customerUserProfileBillingAddressPrimary: string;
    @Column()
    customerUserProfileBillingAddressSecondary: string;
    @Column()
    customerUserProfileBillingAddressCity: string
    @Column()
    customerUserProfileBillingAddressState: string
    @Column()
    customerUserProfileBillingAddressZip: string
    @Column({type: 'boolean', default: true})
    customerUserProfileIsActive: boolean;
    @CreateDateColumn()
    customerUserProfileCreateDate: Date;
    @UpdateDateColumn()
    customerUserProfileUpdateDate: Date; 
} 