import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistStatus')
export class BuylistStatus {
    @PrimaryGeneratedColumn('uuid')
    buylistStatusId: string;
    @Column()
    buylistStatusName: string;
    @Column({nullable: true})
    buylistStatusCode: string;
    @Column({type: 'boolean', default: false})
    buylistStatusIsActive: boolean;
    @CreateDateColumn()
    buylistStatusCreateDate: Date;
    @UpdateDateColumn()
    buylistStatusUpdateDate: Date; 
}