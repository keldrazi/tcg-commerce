import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('inventoryProductCardServiceImportJobType')
export class InventoryProductCardServiceImportJobType {
    @PrimaryGeneratedColumn('uuid')
    inventoryProductCardServiceImportJobTypeId: string;
    @Column({unique: true})
    inventoryProductCardServiceImportJobTypeName: string;
    @Column()
    inventoryProductCardServiceImportJobTypeDescription: string;
    @Column({type: 'boolean', default: false})
    inventoryProductCardServiceImportJobTypeIsActive: boolean;
    @CreateDateColumn()
    inventoryProductCardServiceImportJobTypeCreateDate: Date;
    @UpdateDateColumn()
    inventoryProductCardServiceImportJobTypeUpdateDate: Date;

}