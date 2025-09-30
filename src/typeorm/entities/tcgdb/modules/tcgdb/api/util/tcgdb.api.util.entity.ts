import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tcgdbAPIUtil')
export class TCGdbAPIUtil {
    @PrimaryGeneratedColumn('uuid')
    tcgdbAPIUtilId: string;
    @Column()
    tcgdbAPIUtilAccessToken: string;
    @Column()
    tcgdbAPIUtilAccessTokenIssued: string;
    @Column()
    tcgdbAPIUtilAccessTokenExpires: string;
    @CreateDateColumn()
    tcgdbAPIUtilCreateDate: Date;
    @UpdateDateColumn()
    tcgdbAPIUtilUpdateDate: Date;
} 