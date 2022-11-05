import {  ChildEntity, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class DateEntity {
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;   

    @DeleteDateColumn()
    deleteAt:Date;
}


