import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importSortCardType')
export class ImportSortCardType {
    @PrimaryGeneratedColumn('uuid')
    importSortCardTypeId: string;
    @Column({unique: true})
    importSortCardTypeName: string;
    @Column({unique: true})
    importSortCardTypeDescription: string;
    @Column('jsonb') 
    importSortCardTypeMetadata: string;
    @Column({type: 'boolean', default: false})
    importSortCardTypeIsActive: boolean;
    @CreateDateColumn()
    importSortCardTypeCreateDate: Date;
    @UpdateDateColumn()
    importSortCardTypeUpdateDate: Date; 

}