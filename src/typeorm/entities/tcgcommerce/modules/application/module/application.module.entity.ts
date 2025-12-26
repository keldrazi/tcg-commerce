import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('applicationModule')
export class ApplicationModule {
    @PrimaryGeneratedColumn('uuid')
    applicationModuleId: string;
    @Column()
    applicationModuleName: string;
    @Column()
    applicationModuleHandle: string;
    @Column()
    applicationModuleDescription: string;
    @Column({type: 'boolean', default: false})
    applicationModuleIsActive: boolean;
    @CreateDateColumn()
    applicationModuleCreateDate: Date;
    @UpdateDateColumn()
    applicationModuleUpdateDate: Date; 

} 