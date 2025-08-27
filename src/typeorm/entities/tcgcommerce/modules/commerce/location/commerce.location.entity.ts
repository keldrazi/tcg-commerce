import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceLocation')
export class CommerceLocation {
    @PrimaryGeneratedColumn('uuid')
    commerceLocationId: string;
    @Column()
    @IsString()
    commerceAccountId: string;
    @Column()
    @IsString()
    commerceLocationName: string;
    @Column()
    @IsString()
    commerceLocationAddress: string;
    @Column()
    @IsString()
    commerceLocationCity: string;
    @Column()
    @IsString()
    commerceLocationState: string;
    @Column()
    @IsString()
    commerceLocationZip: string;
    @Column()
    @IsString()
    commerceLocationPhoneNumber: string;
    @Column({ nullable: true })
    @IsString()
    commerceLocationUrl: string;
    @Column({type: 'boolean', default: false})
    commerceLocationIsDefault: boolean;
    @Column({type: 'boolean', default: true})
    commerceLocationIsActive: boolean;
    @CreateDateColumn()
    commerceLocationCreateDate: Date;
    @UpdateDateColumn()
    commerceLocationUpdateDate: Date; 

} 