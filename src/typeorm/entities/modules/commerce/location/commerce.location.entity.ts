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
    commerceLocationPhoneNumber: string;

    @Column({type: 'boolean', default: true})
    commerceLocationIsActive: boolean;

    @CreateDateColumn()
    commerceLoationCreateDate: Date;

    @UpdateDateColumn()
    commerceLocationUpdateDate: Date; 

} 