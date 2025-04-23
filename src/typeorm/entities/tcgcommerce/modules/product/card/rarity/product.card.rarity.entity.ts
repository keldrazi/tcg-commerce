import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardRarity')
export class ProductCardRarity {
    @PrimaryGeneratedColumn('uuid')
    productCardRarityId: string;

    @Column()
    productCardRarityName: string;

    @Column()
    productCardRarityAbbreviation: string;

    @Column({type: 'boolean', default: false})
    productCardRarityIsActive: boolean;

    @CreateDateColumn()
    productCardRarityCreateDate: Date;

    @UpdateDateColumn()
    productCardRarityUpdateDate: Date; 

}