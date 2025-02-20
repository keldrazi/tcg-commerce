import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importJob')
export class ImportJob {
    @PrimaryGeneratedColumn('uuid')
    importJobId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    importJobDate: Date;

    @Column()
    importJobStatus: string;

    @Column({unique: true})
    importJobCode: string;

    @Column()
    importJobType: string;

    @Column()
    importJobSortType: string;

    @Column()
    importJobInputFileName: string;

    @Column()
    importJobInputFileOriginalName: string;

    @Column({nullable: true})
    importJobOutputFileName: string;

    @Column('jsob') //LOCATION | PROCESSEDED BY | TOTAL COST | TOTAL VALUE | TOTAL CARD QTY | COST OF GOODS || CARD DATA
    importJobMetadata: string;

    

    @CreateDateColumn()
    importJobCreateDate: Date;

    @UpdateDateColumn()
    importJobUpdateDate: Date; 

}