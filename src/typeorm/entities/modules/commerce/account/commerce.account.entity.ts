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

    @Column()
    commerceAccountPhone: string;

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