import { IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccount')
export class CommerceAccount {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountId: string;

    @Column()
    commerceAccountName: string;

    @Column({unique: true})
    @IsEmail()
    commerceAccountEmail: string;

    @Column({type: 'boolean', default: false})
    commerceAccountIsActive: boolean;

    @CreateDateColumn()
    commerceAccountCreateDate: Date;

    @UpdateDateColumn()
    commerceAccountUpdateDate: Date; 

} 