import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistImportProductCardProviderType')
export class BuylistImportProductCardProviderType {
    @PrimaryGeneratedColumn('uuid')
    buylistImportProductCardProviderTypeId: string;
    @Column({unique: true})
    buylistImportProductCardProviderTypeName: string;
    @Column({unique: true})
    buylistImportProductCardProviderTypeCode: string;
    @Column()
    buylistImportProductCardProviderTypeDescription: string;
    @Column()
    buylistImportProductCardProviderTypeFileExtension: string;
    @Column()
    buylistImportProductCardProviderTypeFileUploadPath: string;
    @Column('jsonb')
    buylistImportProductCardProviderTypeFileDataKey: string;
    @Column({type: 'boolean', default: false})
    buylistImportProductCardProviderTypeIsActive: boolean;
    @CreateDateColumn()
    buylistImportProductCardProviderTypeCreateDate: Date;
    @UpdateDateColumn()
    buylistImportProductCardProviderTypeUpdateDate: Date;
}