import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PriceProductCardServiceUpdateData } from 'src/tcgcommerce/modules/price/product/card/service/update/interface/price.product.card.service.update.data.interface';

@Entity('priceProductCardServiceUpdate')
export class PriceProductCardServiceUpdate {
    @PrimaryGeneratedColumn('uuid')
    priceProductCardServiceUpdateId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    productSetCode: string;
    @Column()
    productCardLanguageCode: string;
    @Column()
    priceProductCardServiceUpdateStatus: string;
    @Column()
    priceProductCardServiceUpdateType: string;
    @Column()
    priceProductCardServiceUpdateCode: string;
    @Column()
    priceProductCardServiceUpdateTotalCards: number;
    @Column()
    priceProductCardServiceUpdateTotalCardsIncrease: number;
    @Column()
    priceProductCardServiceUpdateTotalCardsDecrease: number;
    @Column('jsonb')
    priceProductCardServiceUpdateData: PriceProductCardServiceUpdateData;
    @CreateDateColumn()
    priceProductCardServiceUpdateCreateDate: Date;
    @UpdateDateColumn()
    priceProductCardServiceUpdateUpdateDate: Date;

}