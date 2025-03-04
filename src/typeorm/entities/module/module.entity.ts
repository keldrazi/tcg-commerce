import { IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('module')
export class Module {
    @PrimaryGeneratedColumn('uuid')
    moduleId: string;

    @Column()
    moduleName: string;

    @Column()
    moduleHandle: string;

    @Column()
    moduleDescription: string;

    @Column({type: 'boolean', default: false})
    moduleIsActive: boolean;

    @CreateDateColumn()
    moduleCreateDate: Date;

    @UpdateDateColumn()
    moduleUpdateDate: Date; 

} 