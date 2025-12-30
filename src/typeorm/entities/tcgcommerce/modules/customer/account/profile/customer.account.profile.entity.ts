import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('customerAccountProfile')
export class CustomerAccountProfile {
    @PrimaryGeneratedColumn('uuid')
    customerAccountProfileId: string;
    @Column()
    customerAccountUserId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    customerAccountProfileFirstName: string;
    @Column()
    customerAccountProfileLastName: string;
    @Column()
    customerAccountProfileShippingAddressPrimary: string;
    @Column()
    customerAccountProfileShippingAddressSecondary: string;
    @Column()
    customerAccountProfileShippingAddressCity: string
    @Column()
    customerAccountProfileShippingAddressState: string
    @Column()
    customerAccountProfileShippingAddressZip: string
    @Column()
    customerAccountProfileBillingAddressPrimary: string;
    @Column()
    customerAccountProfileBillingAddressSecondary: string;
    @Column()
    customerAccountProfileBillingAddressCity: string
    @Column()
    customerAccountProfileBillingAddressState: string
    @Column()
    customerAccountProfileBillingAddressZip: string
    @Column({type: 'boolean', default: true})
    customerAccountProfileIsActive: boolean;
    @CreateDateColumn()
    customerAccountProfileCreateDate: Date;
    @UpdateDateColumn()
    customerAccountProfileUpdateDate: Date; 
} 