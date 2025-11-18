import { MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('buylistUserVerification')
export class BuylistUserVerification {
    @PrimaryGeneratedColumn('uuid')
    buylistUserVerificationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    buylistUserId: string;
    @Column()
    buylistUserVerificationType: string;
    @Column({unique: true})
    @MinLength(6)
    buylistUserVerificationCode: number;
    @Column()
    buylistUserVerificationCodeExpires: Date;
    @Column({type: 'boolean', default: false})
    buylistUserVerificationCodeIsUsed: boolean;
    @CreateDateColumn()
    buylistUserVerificationCreateDate: Date;
    @UpdateDateColumn()
    buylistUserVerificationUpdateDate: Date; 
} 