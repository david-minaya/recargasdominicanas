import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DataPlan extends BaseEntity {

  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;
}
