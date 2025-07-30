import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGSet')
export class TCGPlayerMTGSet {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGSetId: string;
    @Column()
    tcgPlayerMTGSetGroupId: number;
    @Column()
    tcgPlayerMTGSetName: string;
    @Column()
    tcgPlayerMTGSetAbbreviation: string;
    @Column()
    tcgPlayerMTGSetIsSupplemental: boolean;
    @Column()
    tcgPlayerMTGSetPublishedOn: Date;
    @Column()
    tcgPlayerMTGSetModifiedOn: Date;
    @Column({nullable: true})
    tcgPlayerMTGSetTotalCards: number;
    @CreateDateColumn()
    tcgPlayerMTGSetCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerMTGSetUpdateDate: Date; 

} 