import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('scryfallMTGSet')
export class ScryfallMTGSet {
    @PrimaryGeneratedColumn('uuid')
    scryfallMTGSetId: string;

    @Column()
    scryfallMTGSetScryfallId: string;

    @Column({nullable: true})
    scryfallMTGSetTCGPlayerId: number;

    @Column()
    scryfallMTGSetCode: string;

    @Column()
    scryfallMTGSetName: string;

    @Column({nullable: true})
    scryfallMTGSetReleasedAt: Date;

    @Column()
    scryfallMTGSetCardCount: number;

    @Column()
    scryfallMTGSetDigital: boolean;

    @Column()
    scryfallMTGSetSearchURI: string;

    @Column()
    scryfallMTGSetIconSvgURI: string;

    @Column('jsonb')
    scryfallMTGSetData: string;

    @CreateDateColumn()
    scryfallMTGSetCreateDate: Date;

    @UpdateDateColumn()
    scryfallMTGSetUpdateDate: Date; 

} 