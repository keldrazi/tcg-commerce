import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGRarity')
export class TCGPlayerMTGRarity {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGRarId: string;
    @Column()
    tcgPlayerMTGRarityId: number;
    @Column()
    tcgPlayerMTGRarityDisplayText: string;
    @Column()
    tcgPlayerMTGRarityDBValue: string;
    @CreateDateColumn()
    tcgPlayerMTGRarityCreateDate: Date;
    @UpdateDateColumn()
    tcgPlayerMTGRarityUpdateDate: Date; 

} 