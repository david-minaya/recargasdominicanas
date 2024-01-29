import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { SessionData } from 'express-session';

@Entity()
export class Session extends BaseEntity {
 
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'json' })
  data!: SessionData;
}
