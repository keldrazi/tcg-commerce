import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceUpdatePriceJob')
export class InventoryProductCardServiceUpdatePriceJob {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceUpdatePriceJobId: string;
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
    inventoryProductCardServiceUpdatePriceJobDate: Date;
    @Column()
    inventoryProductCardServiceUpdatePriceJobCode: string;
    @Column()
    inventoryProductCardServiceUpdatePriceJobStatus: string;
    @Column({ default: 0 })
    inventoryProductCardServiceUpdatePriceJobCount: number;
    @CreateDateColumn()
    inventoryProductCardServiceUpdatePriceJobCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceUpdatePriceJobUpdateDate: Date;
}