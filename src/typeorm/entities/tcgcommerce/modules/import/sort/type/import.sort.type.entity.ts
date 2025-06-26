import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importSortType')
export class ImportSortType {
    @PrimaryGeneratedColumn('uuid')
    importSortTypeId: string;

    @Column({unique: true})
    importSortTypeName: string;

    @Column({unique: true})
    importSortTypeDescription: string;

    @Column('jsonb') 
    importSortTypeMetadata: string;

    @Column({type: 'boolean', default: false})
    importSortTypeIsActive: boolean;

    @CreateDateColumn()
    importSortTypeCreateDate: Date;

    @UpdateDateColumn()
    importSortTypeUpdateDate: Date; 

}