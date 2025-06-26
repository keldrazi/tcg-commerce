import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importJob')
export class ImportJob {
    @PrimaryGeneratedColumn('uuid')
    importJobId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    productVendorName: string;

    @Column()
    productLineName: string;

    @Column()
    importSortTypeName: string;

    @Column()
    importJobDate: Date;

    @Column({unique: true})
    importJobCode: string;

    @Column()
    importJobStatus: string;    

    @Column()
    importJobInputFileName: string;

    @Column()
    importJobInputFileOriginalName: string;

    @Column({nullable: true})
    importJobOutputFileName: string;

    @Column('jsonb') //CARD DATA;
    importJobSortData: string;

    @Column('jsonb') //LOCATION | PROCESSED BY | TOTAL COST | TOTAL VALUE | TOTAL CARD QTY | COST OF GOODS
    importJobMetadata: string;

    @Column({type: 'boolean', default: false})
    importJobIsPublished: boolean;

    @CreateDateColumn()
    importJobCreateDate: Date;

    @UpdateDateColumn()
    importJobUpdateDate: Date; 

}