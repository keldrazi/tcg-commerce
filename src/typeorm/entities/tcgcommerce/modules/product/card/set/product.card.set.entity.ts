import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('productCardSet')
export class ProductCardSet {
    @PrimaryGeneratedColumn('uuid')
    productCardSetId: string;

    @Column()
    productVendorId: string;

    @Column()
    productLineId: string;

    @Column()
    productCardSetName: string;

    @Column()
    productCardSetAbbreviation: string;

    @Column('jsonb')
    productCardSetExtendedData: string;

    @Column('jsonb')
    productCardSetMetadata: string;

    @Column({type: 'boolean', default: false})
    productCardSetIsActive: boolean;

    @CreateDateColumn()
    productCardSetCreateDate: Date;

    @UpdateDateColumn()
    productCardSetUpdateDate: Date; 

}