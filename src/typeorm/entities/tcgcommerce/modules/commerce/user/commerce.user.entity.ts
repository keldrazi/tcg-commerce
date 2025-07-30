import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('commerceUser')
export class CommerceUser {
    @PrimaryGeneratedColumn('uuid')
    commerceUserId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceUserName: string;
    @Column({unique: true})
    @IsEmail()
    commerceUserEmail: string;
    @Column()
    @Exclude()
    @IsString()
    @MinLength(8)
    commerceUserPassword: string;
    @Column('jsonb')
    commerceUserRoles: string;
    @Column({type: 'boolean', default: false})
    commerceUserIsActive: boolean;
    @CreateDateColumn()
    commerceUserCreateDate: Date;
    @UpdateDateColumn()
    commerceUserUpdateDate: Date; 
} 