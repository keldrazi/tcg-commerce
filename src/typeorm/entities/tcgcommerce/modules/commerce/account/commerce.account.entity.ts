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
    @Column({type: 'jsonb', nullable: true})
    commerceAccountApplicationModules: string;
    @Column({nullable: true})
    commerceAccountAPIClientId: string;
    @Column({nullable: true})
    commerceAccountAPIClientToken: string;
    @Column({type: 'boolean', default: true})
    commerceAccountIsActive: boolean;
    @CreateDateColumn()
    commerceAccountCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountUpdateDate: Date; 

} 