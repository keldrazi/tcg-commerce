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

    @Column()
    importJobCode: string;

    @Column()
    importJobType: string;

    @Column()
    importJobSortType: string;

    @Column()
    importJobInputFileName: string;

    @Column({nullable: true})
    importJobInputFileOriginalName: string;

    @Column()
    importJobProcessedBy: string;

    @Column({nullable: true})
    importJobLocationName: string;

    @Column({type: 'decimal'})
    importJobTotalCost: number;

    @Column({type: 'decimal'})
    importJobTotalValue: number;

    @Column({nullable: true})
    importJobTotalCards: number;

    @Column({type: 'decimal', nullable: true})
    importJobCostOfGoods: number;

    @Column({nullable: true})
    importJobOutputFileName: string;

    @CreateDateColumn()
    importJobCreateDate: Date;

    @UpdateDateColumn()
    importJobUpdateDate: Date; 

}