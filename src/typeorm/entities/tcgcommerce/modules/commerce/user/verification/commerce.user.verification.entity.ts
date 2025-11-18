import { MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceUserVerification')
export class CommerceUserVerification {
    @PrimaryGeneratedColumn('uuid')
    commerceUserVerificationId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceUserId: string;
    @Column()
    commerceUserVerificationType: string;
    @Column({unique: true})
    @MinLength(6)
    commerceUserVerificationCode: number;
    @Column()
    commerceUserVerificationCodeExpires: Date;
    @Column({type: 'boolean', default: false})
    commerceUserVerificationCodeIsUsed: boolean;
    @CreateDateColumn()
    commerceUserVerificationCreateDate: Date;
    @UpdateDateColumn()
    commerceUserVerificationUpdateDate: Date; 
} 