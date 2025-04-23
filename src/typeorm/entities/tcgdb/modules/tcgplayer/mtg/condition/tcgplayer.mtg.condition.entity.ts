import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgPlayerMTGCondition')
export class TCGPlayerMTGCondition {
    @PrimaryGeneratedColumn('uuid')
    tcgPlayerMTGCondId: string;
    @Column()
    tcgPlayerMTGConditionId: number;

    @Column()
    tcgPlayerMTGConditionName: string;

    @Column()
    tcgPlayerMTGConditionAbbreviation: string;

    @Column()
    tcgPlayerMTGConditionDisplayOrder: number;

    @CreateDateColumn()
    tcgPlayerMTGConditionCreateDate: Date;

    @UpdateDateColumn()
    tcgPlayerMTGConditionUpdateDate: Date; 

} 