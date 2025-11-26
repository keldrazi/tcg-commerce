import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('commerceAccountToken')
export class CommerceAccountToken {
    @PrimaryGeneratedColumn('uuid')
    commerceAccountTokenId: string;
    @Column()
    commerceAccountId: string;
    @Column()
    commerceAccountToken: string;
    @Column()
    commerceAccountTokenIssued: string;
    @Column()
    commerceAccountTokenExpires: string;
    @CreateDateColumn()
    commerceAccountTokenCreateDate: Date;
    @UpdateDateColumn()
    commerceAccountTokenUpdateDate: Date; 

} 