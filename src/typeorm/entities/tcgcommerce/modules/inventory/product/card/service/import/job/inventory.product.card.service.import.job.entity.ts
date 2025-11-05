import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceImportJob')
export class InventoryProductCardServiceImportJob {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceImportJobId: string;
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
    inventoryProductCardServiceImportTypeId: string;
    @Column()
    inventoryProductCardServiceImportTypeName: string;
    @Column()
    inventoryProductCardServiceImportJobFileURL: string;
    @Column()
    inventoryProductCardServiceImportJobFileOriginalName: string;
    @Column()
    inventoryProductCardServiceImportJobDate: Date;
    @Column()
    inventoryProductCardServiceImportJobCode: string;
    @Column()
    inventoryProductCardServiceImportJobStatus: string;
    @Column({ default: 0 })
    inventoryProductCardServiceImportJobCount: number;
    @CreateDateColumn()
    inventoryProductCardServiceImportJobCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceImportJobUpdateDate: Date;
}