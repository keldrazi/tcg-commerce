import { MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('customerAccountVerification')
export class CustomerAccountVerification {
    @PrimaryGeneratedColumn('uuid')
    customerAccountVerificationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    customerAccountUserId: string;
    @Column()
    customerAccountVerificationType: string;
    @Column({unique: true})
    customerAccountVerificationCode: string;
    @Column()
    customerAccountVerificationCodeExpires: Date;
    @Column({type: 'boolean', default: true})
    customerAccountVerificationCodeIsValid: boolean;
    @CreateDateColumn()
    customerAccountVerificationCreateDate: Date;
    @UpdateDateColumn()
    customerAccountVerificationUpdateDate: Date; 
} 