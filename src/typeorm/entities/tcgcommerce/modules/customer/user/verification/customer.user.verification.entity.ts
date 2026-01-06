import { MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('customerUserVerification')
export class CustomerUserVerification {
    @PrimaryGeneratedColumn('uuid')
    customerUserVerificationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    customerUserId: string;
    @Column()
    customerUserVerificationType: string;
    @Column({unique: true})
    customerUserVerificationCode: string;
    @Column()
    customerUserVerificationCodeExpires: Date;
    @Column({type: 'boolean', default: true})
    customerUserVerificationCodeIsValid: boolean;
    @CreateDateColumn()
    customerUserVerificationCreateDate: Date;
    @UpdateDateColumn()
    customerUserVerificationUpdateDate: Date; 
} 