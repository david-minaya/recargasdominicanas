import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  balance!: number;
}
