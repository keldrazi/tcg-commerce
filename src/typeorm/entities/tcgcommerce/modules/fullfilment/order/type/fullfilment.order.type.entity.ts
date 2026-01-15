import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fullfilmentOrderType')
export class FullfilmentOrderType {
    @PrimaryGeneratedColumn('uuid')
    fullfilmentOrderTypeId: string;
    @Column()
    fullfilmentOrderTypeName: string;
     @Column()
    fullfilmentOrderTypeCode: string;
    @Column()
    fullfilmentOrderTypeDescription: string;
    @Column({type: 'boolean', default: false})
    fullfilmentOrderTypeIsActive: boolean;
    @CreateDateColumn()
    fullfilmentOrderTypeCreateDate: Date;
    @UpdateDateColumn()
    fullfilmentOrderTypeUpdateDate: Date; 
} 