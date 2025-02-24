import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('ProductCardItem')
export class ProductCardItem {
    @PrimaryGeneratedColumn('uuid')
    ProductCardItemId: string;

    @Column()
    CommerceAccountId: string;
    
    @Column()
    ProductCardTCGDBId: string;

    @Column()
    ProductCardType: string;
    
    @Column()
    ProductCardSetAbbreviation: string;

    @Column()
    ProductCardName: string;
    
    @Column()
    ProductCardCleanName: string;

    @Column()
    ProductCardImage: string;

    @Column('jsonb')
    ProductCardMetadata: string;

    @CreateDateColumn()
    ProductCardCreateDate: Date;

    @UpdateDateColumn()
    ProductCardUpdateDate: Date; 

}