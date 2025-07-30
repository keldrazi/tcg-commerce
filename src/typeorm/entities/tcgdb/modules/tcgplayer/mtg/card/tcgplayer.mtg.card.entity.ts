import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGCard')
export class TCGPlayerMTGCard {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGCardId: string;
    @Column()
    tcgPlayerMTGCardProductId: number;
    @Column()
    tcgPlayerMTGCardGroupId: number;
    @Column({nullable: true})
    tcgPlayerMTGCardSetCode: string;
    @Column()
    tcgPlayerMTGCardName: string;
    @Column()
    tcgPlayerMTGCardCleanName: string;
    @Column()
    tcgPlayerMTGCardImageURL: string;
    @Column()
    tcgPlayerMTGCardURL: string;
    @Column()
    tcgPlayerMTGCardModifiedOn: Date;
    @Column('jsonb')
    tcgPlayerMTGCardData: string;
    @Column('jsonb')
    tcgPlayerMTGCardSKUs: string;
    @CreateDateColumn()
    tcgPlayerMTGCardCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerMTGCardUpdateDate: Date; 

} 