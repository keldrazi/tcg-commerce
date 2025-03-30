import { IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccount')
export class CommerceAccount {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountId: string;

    @Column()
    commerceAccountName: string;

    @Column()
    commerceAccountContactName: string;

    @Column({unique: true})
    @IsEmail()
    commerceAccountContactEmail: string;

    @Column()
    commerceAccountContactPhone: string;

    @Column({unique: true})
    commerceAccountHandle: string;

    @Column('jsonb')
    commerceAccountModules: string;

    @Column({type: 'boolean', default: true})
    commerceAccountIsActive: boolean;

    @CreateDateColumn()
    commerceAccountCreateDate: Date;

    @UpdateDateColumn()
    commerceAccountUpdateDate: Date; 

} 