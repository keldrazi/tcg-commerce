import { MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('customerAccountUserVerification')
export class CustomerAccountUserVerification {
    @PrimaryGeneratedColumn('uuid')
    customerAccountUserVerificationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    customerAccountUserId: string;
    @Column()
    customerAccountUserVerificationType: string;
    @Column({unique: true})
    @MinLength(6)
    customerAccountUserVerificationCode: number;
    @Column()
    customerAccountUserVerificationCodeExpires: Date;
    @Column({type: 'boolean', default: true})
    customerAccountUserVerificationCodeIsValid: boolean;
    @CreateDateColumn()
    customerAccountUserVerificationCreateDate: Date;
    @UpdateDateColumn()
    customerAccountUserVerificationUpdateDate: Date; 
} 