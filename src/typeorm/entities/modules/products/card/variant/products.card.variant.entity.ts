import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('cardVariant')
export class CardVariant {
    @PrimaryGeneratedColumn('uuid')
    cardVariantId: string;

    @Column()
    cardVariantName: string;

    @CreateDateColumn()
    cardVariantCreateDate: Date;

    @UpdateDateColumn()
    cardVariantUpdateDate: Date; 

}