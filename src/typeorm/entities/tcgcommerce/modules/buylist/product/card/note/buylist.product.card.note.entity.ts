import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistProductCardNote')
export class BuylistProductCardNote {
    @PrimaryGeneratedColumn('uuid')
    buylistProductCardNoteId: string;
    @Column()
    buylistProductCardId: string;
    @Column() //Internal/External;
    buylistProductCardNoteType: string
    @Column()
    buylistProductCardNoteUserName: string;
    @Column()
    buylistProductCardNote: string;
    @CreateDateColumn()
    buylistProductCardNoteCreateDate: Date;
    @UpdateDateColumn()
    buylistProductCardNoteUpdateDate: Date;
}