import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardRarity')
export class ProductCardRarity {
    @PrimaryGeneratedColumn('uuid')
    productCardRarityId: string;
    @Column()
    productLineId: string;
    @Column()
    productCardRarityName: string;
    @Column()
    productCardRarityCode: string;
    @Column({type: 'boolean', default: false})
    productCardRarityIsActive: boolean;
    @CreateDateColumn()
    productCardRarityCreateDate: Date;
    @UpdateDateColumn()
    productCardRarityUpdateDate: Date; 

}