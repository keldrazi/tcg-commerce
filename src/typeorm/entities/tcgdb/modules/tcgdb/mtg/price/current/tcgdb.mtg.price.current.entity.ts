import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbMTGPriceCurrent')
export class TCGdbMTGPriceCurrent {
    @PrimaryGeneratedColumn('uuid')
    tcgdbMTGPriceCurrentId: string;
    
    @Column()
    tcgdbMTGCardId: string;

    @Column()
    tcgdbMTGPriceCurrentTCGPlayerId: number;

    @Column({nullable: true})
    tcgdbMTGPriceCurrentSetAbbreviation: string;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceCurrentLowPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceCurrentMidPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceCurrentHighPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceCurrentMarketPrice: number;

    @Column({type: 'decimal', nullable: true})
    tcgdbMTGPriceCurrentDirectLowPrice: number;

    @Column()
    tcgdbMTGPriceCurrentSubTypeName: string;

    @CreateDateColumn()
    tcgdbMTGPriceCurrentCreateDate: Date;

    @UpdateDateColumn()
    tcgdbMTGPriceCurrentUpdateDate: Date; 

} 