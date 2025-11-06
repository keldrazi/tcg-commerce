import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceImportJobProviderType')
export class InventoryProductCardServiceImportJobProviderType {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceImportJobProviderTypeId: string;
    @Column({unique: true})
    inventoryProductCardServiceImportJobProviderTypeName: string;
    @Column({unique: true})
    inventoryProductCardServiceImportJobProviderTypeCode: string;
    @Column()
    inventoryProductCardServiceImportJobProviderTypeDescription: string;
    @Column()
    inventoryProductCardServiceImportJobProviderTypeFileExtension: string;
    @Column({type: 'boolean', default: false})
    inventoryProductCardServiceImportJobProviderTypeIsActive: boolean;
    @CreateDateColumn()
    inventoryProductCardServiceImportJobProviderTypeCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceImportJobProviderTypeUpdateDate: Date;

}