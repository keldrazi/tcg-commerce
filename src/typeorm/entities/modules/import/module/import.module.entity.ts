import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('importModule')
export class ImportModule {
    @PrimaryGeneratedColumn('uuid')
    importModuleId: string;

    @Column()
    moduleId: string;

    @Column()
    commerceAccountId: string;

    @CreateDateColumn()
    importModuleCreateDate: Date;

    @UpdateDateColumn()
    importModuleUpdateDate: Date; 

} 