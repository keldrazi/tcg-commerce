import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGRarity')
export class TCGdbMTGRarity {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGRarityId: string;
    @Column({nullable: true})
    tcgdbMTGRarityTCGPlayerId: number;
    @Column()
    tcgdbMTGRarityName: string;
    @Column()
    tcgdbMTGRarityCode: string;
    @CreateDateColumn()
    tcgdbMTGRarityCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGRarityUpdateDate: Date; 

} 