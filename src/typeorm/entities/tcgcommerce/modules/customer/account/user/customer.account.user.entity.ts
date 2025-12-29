import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('customerAccountUser')
export class CustomerAccountUser {
    @PrimaryGeneratedColumn('uuid')
    customerAccountUserId: string;
    @Column()
    commerceAccountId: string;
    @Column({unique: true})
    @IsEmail()
    customerAccountUserEmail: string;
    @Column()
    @Exclude()
    @IsString()
    @MinLength(8)
    customerAccountUserPassword: string;
    @Column({type: 'boolean', default: false})
    customerAccountUserIsVerified: boolean;
    @Column({type: 'boolean', default: true})
    customerAccountUserIsActive: boolean;
    @CreateDateColumn()
    customerAccountUserCreateDate: Date;
    @UpdateDateColumn()
    customerAccountUserUpdateDate: Date; 
} 