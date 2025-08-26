import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PricingProductCardServiceUpdateData } from 'src/tcgcommerce/modules/pricing/product/card/service/update/interface/pricing.product.card.service.update.interface';

@Entity('pricingProductCardServiceUpdate')
export class PricingProductCardServiceUpdate {
    @PrimaryGeneratedColumn('uuid')
    pricingProductCardServiceUpdateId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    productVendorId: string;
    @Column()
    productLineId: string;
    @Column()
    productTypeId: string;
    @Column()
    pricingProductCardServiceUpdateStatus: string;
    @Column()
    pricingProductCardServiceUpdateType: string;
    @Column()
    pricingProductCardServiceUpdateCode: string;
    @Column()
    pricingProductCardServiceUpdateTotalCards: number;
    @Column()
    pricingProductCardServiceUpdateTotalCardsIncrease: number;
    @Column()
    pricingProductCardServiceUpdateTotalCardsDecrease: number;
    @Column('jsonb')
    pricingProductCardServiceUpdateData: PricingProductCardServiceUpdateData;
    @CreateDateColumn()
    pricingProductCardServiceUpdateCreateDate: Date;
    @UpdateDateColumn()
    pricingProductCardServiceUpdateUpdateDate: Date;

}