import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity('scryfallMTGCard')
export class ScryfallMTGCard {
    @PrimaryGeneratedColumn('uuid')
    scryfallMTGCardId: string;
    @Column()
    scryfallMTGCardScryfallId: string;
    @Column({nullable: true})
    scryfallMTGCardTCGPlayerId: number;
    @Column({nullable: true})
    scryfallMTGCardTCGPlayerEtchedId: number;
    @Column({nullable: true})
    scryfallMTGCardCardMarketId: number;
    @Column()
    scryfallMTGCardSetId: string;
    @Column()
    scryfallMTGCardName: string;
    @Column()
    scryfallMTGCardReleasedAt: Date;
    @Column()
    scryfallMTGCardDigital: boolean;
    @Column()
    scryfallMTGCardPromo: boolean;
    @Column('jsonb')
    scryfallMTGCardData: string;
    @CreateDateColumn()
    scryfallMTGCardCreateDate: Date;
    @UpdateDateColumn()
    scryfallMTGCardUpdateDate: Date; 

} 