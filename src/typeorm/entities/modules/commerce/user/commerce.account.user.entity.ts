import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'

@Entity('commerceAccountUser')
export class CommerceAccountUser {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountUserId: string;

    @Column()
    commerceAccountId: string;

    @Column()
    commerceAccountUserName: string;

    @Column({unique: true})
    @IsEmail()
    commerceAccountUserEmail: string;

    @Column()
    @Exclude()
    @IsString()
    @MinLength(8)
    commerceAccountUserPassword: string;

    @Column('jsonb')
    commerceAccountUserRoles: string;

    @Column({type: 'boolean', default: false})
    commerceAccountUserIsActive: boolean;

    @CreateDateColumn()
    commerceAccountUserCreateDate: Date;

    @UpdateDateColumn()
    commerceAccountUserUpdateDate: Date; 

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.commerceAccountUserPassword = await bcrypt.hash(this.commerceAccountUserPassword, 10);
    }

} 