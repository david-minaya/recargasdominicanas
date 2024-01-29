import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class NotificationToken extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => User, user => user.notificationTokens)
  user!: User;
}
