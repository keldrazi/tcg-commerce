import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistImportProductCard')
export class BuylistImportProductCard {
    @PrimaryGeneratedColumn('uuid')
    buylistImportProductCardId: string;
    @Column()
    buylistProductCardId: string;
    @Column()
    buylistImportProductCardProviderTypeId: string;
    @Column()
    buylistImportProductCardProviderTypeCode: string;
    @Column()
    buylistImportProductCardProviderTypeName: string;
    @Column()
    buylistImportProductCardFileURL: string;
    @Column()
    buylistImportProductCardFileOriginalName: string;
    @Column()
    buylistImportProductCardDate: Date;
    @Column()
    buylistImportProductCardCode: string
    @Column()
    buylistImportProductCardCount: number;
     @Column()
    buylistImportProductCardQtyCount: number;
    @CreateDateColumn()
    buylistImportProductCardCreateDate: Date;
    @UpdateDateColumn()
    buylistImportProductCardUpdateDate: Date; 
}
