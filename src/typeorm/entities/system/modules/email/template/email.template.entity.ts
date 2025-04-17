import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('emailTemplate')
export class EmailTemplate {
    @PrimaryGeneratedColumn('uuid')
    emailTemplateId: string;

    @Column()
    emailTemplateName: string;

    @Column()
    emailTemplateDescription: string;

    @Column()
    emailTemplateSubject: string;

    @Column()
    emailTemplateHBSTemplateName: string;

    @Column('jsonb')
    emailTemplateSettings: string;

    @Column({type: 'boolean', default: false})
    emailTemplateIsActive: boolean;

    @CreateDateColumn()
    emailTemplateCreateDate: Date;

    @UpdateDateColumn()
    emailTemplateUpdateDate: Date; 

} 