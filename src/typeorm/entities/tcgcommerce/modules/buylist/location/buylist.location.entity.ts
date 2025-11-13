import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistLocation')
export class BuylistLocation {
    @PrimaryGeneratedColumn('uuid')
    buylistLocationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    buylistLocationName: string;
    @Column({nullable: true})
    buylistLocationCode: string;
    @Column({type: 'boolean', default: false})
    buylistLocationIsActive: boolean;
    @CreateDateColumn()
    buylistLocationCreateDate: Date;
    @UpdateDateColumn()
    buylistLocationUpdateDate: Date; 
}