import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGCard')
export class TCGdbMTGCard {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGCardId: string;

    @Column({nullable: true})
    tcgdbMTGCardTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbMTGCardScryfallId: string;

    @Column({nullable: true})
    tcgdbMTGCardSetName: string;

    @Column({nullable: true})
    tcgdbMTGCardSetAbbreviation: string;

    @Column({nullable: true})
    tcgdbMTGCardNumber: string;

    @Column()
    tcgdbMTGCardName: string;

    @Column()
    tcgdbMTGCardCleanName: string;

    @Column()
    tcgdbMTGCardImageURL: string;

    @Column('jsonb')
    tcgdbMTGCardTCGPlayerData: string;

    @Column('jsonb')
    tcgdbMTGCardTCGPlayerSKUs: string

    @Column('jsonb', {nullable: true})
    tcgdbMTGCardScryfallData: string

    @CreateDateColumn()
    tcgdbMTGCardCreateDate: Date;

    @UpdateDateColumn()
    tcgdbMTGCardUpdateDate: Date; 

} 