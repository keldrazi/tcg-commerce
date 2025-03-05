import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importCard')
export class ImportCard {
    @PrimaryGeneratedColumn('uuid')
    importCardId: string;

    @Column()
    importJobId: string;

    @Column()
    importCardTCGDBId: string;

    @Column()
    importCardStatus: string;

    @Column()
    importCardName: string;

    @Column()
    importCardSet: string;

    @Column()
    importCardCondition: string;

    @Column()
    importCardPrinting: string;

    @Column()
    importCardQty: number;

    @Column({type: 'decimal'})
    importCardPrice: number;

    @CreateDateColumn()
    importCardCreateDate: Date;

    @UpdateDateColumn()
    importCardUpdateDate: Date; 

}