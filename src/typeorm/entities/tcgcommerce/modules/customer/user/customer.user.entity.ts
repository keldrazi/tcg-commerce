import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('customerUser')
export class CustomerUser {
    @PrimaryGeneratedColumn('uuid')
    customerUserId: string;
    @Column()
    commerceAccountId: string;
    @Column({unique: true})
    @IsEmail()
    customerUserEmail: string;
    @Column()
    @Exclude()
    @IsString()
    @MinLength(8)
    customerUserPassword: string;
    @Column({type: 'boolean', default: false})
    customerUserIsVerified: boolean;
    @Column({type: 'boolean', default: true})
    customerUserIsActive: boolean;
    @CreateDateColumn()
    customerUserCreateDate: Date;
    @UpdateDateColumn()
    customerUserUpdateDate: Date; 
} 