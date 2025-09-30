import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGSet')
export class TCGdbMTGSet {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGSetId: string;
    @Column({nullable: true})
    tcgdbMTGSetTCGPlayerId: number;
    @Column({nullable: true})
    tcgdbMTGSetScryfallId: string;
    @Column()
    tcgdbMTGSetName: string;
    @Column()
    tcgdbMTGSetCode: string;
    @Column()
    tcgdbMTGSetPublishedOn: Date;
    @Column({nullable: true})
    tcgdbMTGSetTotalCards: number;
    @CreateDateColumn()
    tcgdbMTGSetCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGSetUpdateDate: Date; 

} 