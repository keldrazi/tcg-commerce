import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGCondition')
export class TCGdbMTGCondition {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGConditionId: string;
    @Column({nullable: true})
    tcgdbMTGConditionTCGPlayerId: number;
    @Column()
    tcgdbMTGConditionName: string;
    @Column()
    tcgdbMTGConditionCode: string;
    @Column({type: 'decimal'})
    tcgdbMTGConditionPriceFactor: number;
    @Column()
    tcgdbMTGConditionDisplayOrder: number;
    @CreateDateColumn()
    tcgdbMTGConditionCreateDate: Date;
    @UpdateDateColumn()
    tcgdbMTGConditionUpdateDate: Date; 

} 