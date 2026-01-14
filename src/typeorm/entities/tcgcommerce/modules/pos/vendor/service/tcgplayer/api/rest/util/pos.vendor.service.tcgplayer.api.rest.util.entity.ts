import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('posVendorServiceTCGPlayerAPIRestUtil')
export class POSVendorServiceTCGPlayerAPIRestUtil {
    @PrimaryGeneratedColumn('uuid')
    posVendorServiceTCGPlayerAPIRestUtilId: string;
    @Column()
    posVendorServiceTCGPlayerAPIRestUtilAccessToken: string;
    @Column()
    posVendorServiceTCGPlayerAPIRestUtilAccessTokenIssued: string;
    @Column()
    posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires: string;
    @CreateDateColumn()
    posVendorServiceTCGPlayerAPIRestUtilCreateDate: Date;
    @UpdateDateColumn()
    posVendorServiceTCGPlayerAPIRestUtilUpdateDate: Date;

} 