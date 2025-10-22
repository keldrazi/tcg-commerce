import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceCreateJob')
export class InventoryProductCardServiceCreateJob {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceCreateJobId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    commerceLocationName: string;
    @Column()
    commerceUserId: string;
    @Column()
    commerceUserName: string;
    @Column()
    productVendorId: string;
    @Column()
    productVendorCode: string;
    @Column()
    productLineId: string;
    @Column()
    productLineCode: string;
    @Column()
    productTypeId: string;
    @Column()
    productTypeCode: string;
    @Column()
    productLanguageId: string;
    @Column()
    productLanguageCode: string;
    @Column()
    productSetId: string;
    @Column()
    productSetCode: string;
    @Column()
    inventoryProductCardServiceCreateJobDate: Date;
    @Column()
    inventoryProductCardServiceCreateJobCode: string;
    @Column()
    inventoryProductCardServiceCreateJobStatus: string;
    @Column({ default: 0 })
    inventoryProductCardServiceCreateJobCount: number;
    @CreateDateColumn()
    inventoryProductCardServiceCreateJobCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceCreateJobUpdateDate: Date;
}