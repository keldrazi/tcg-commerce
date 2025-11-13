import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistType')
export class BuylistType {
    @PrimaryGeneratedColumn('uuid')
    buylistTypeId: string;
    @Column()
    buylistTypeName: string;
    @Column({nullable: true})
    buylistTypeCode: string;
    @Column({type: 'boolean', default: false})
    buylistTypeIsActive: boolean;
    @CreateDateColumn()
    buylistTypeCreateDate: Date;
    @UpdateDateColumn()
    buylistTypeUpdateDate: Date; 
}