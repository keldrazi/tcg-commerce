import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('posVendor')
export class POSVendor {
    @PrimaryGeneratedColumn('uuid')
    posVendorId: string;
    @Column()
    posVendorName: string;
    @Column()
    posVendorDescription: string;
    @Column()
    posVendorURL: string;
    @Column({type: 'boolean', default: false})
    posVendorIsActive: boolean;
    @CreateDateColumn()
    posVendorCreateDate: Date;
    @UpdateDateColumn()
    posVendorUpdateDate: Date; 

}