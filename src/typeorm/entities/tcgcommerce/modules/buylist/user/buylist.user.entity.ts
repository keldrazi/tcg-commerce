import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('buylistUser')
export class BuylistUser {
    @PrimaryGeneratedColumn('uuid')
    buylistUserId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    buylistUserFirstName: string;
    @Column()
    buylistUserLastName: string;
    @Column({unique: true})
    @IsEmail()
    buylistUserEmail: string;
    @Column()
    @Exclude()
    @IsString()
    @MinLength(8)
    buylistUserPassword: string;
    @Column()
    buylistUserAddress1: string;
    @Column({nullable: true})
    buylistUserAddress2: string;
    @Column()
    buylistUserCity: string;
    @Column()
    buylistUserState: string;
    @Column()
    buylistUserZipCode: string;
    @Column({type: 'boolean', default: false})
    buylistUserIsVerified: boolean;
    @Column({type: 'boolean', default: true})
    buylistUserIsActive: boolean;
    @CreateDateColumn()
    buylistUserCreateDate: Date;
    @UpdateDateColumn()
    buylistUserUpdateDate: Date; 
} 