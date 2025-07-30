import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importJobCard')
export class ImportJobCard {
    @PrimaryGeneratedColumn('uuid')
    importJobCardId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceLocationId: string;
    @Column()
    commerceLocationName: string;
    @Column()
    commerceUserName: string;
    @Column()
    productVendorId: string;
    @Column()
    productVendorName: string;
    @Column()
    productLineId: string;
    @Column()
    productLineName: string;
    @Column()
    productLineCode: string;
    @Column()
    importSortCardTypeName: string;
    @Column()
    importJobCardDate: Date;
    @Column({unique: true})
    importJobCardCode: string;
    @Column()
    importJobCardStatus: string;    
    @Column({nullable: true})
    importJobCardInputFileURL: string;
    @Column()
    importJobCardInputFileOriginalName: string;
    @Column({nullable: true})
    importJobCardOutputFileURL: string;
    @Column('jsonb', {nullable: true}) //CARD DATA;
    importJobCardSortData: string;
    @Column('jsonb') //LOCATION | PROCESSED BY | TOTAL COST | TOTAL VALUE | TOTAL CARD QTY | COST OF GOODS
    importJobCardMetadata: string;
    @Column({type: 'boolean', default: false})
    importJobCardIsPublished: boolean;
    @CreateDateColumn()
    importJobCardCreateDate: Date;
    @UpdateDateColumn()
    importJobCardUpdateDate: Date;

}