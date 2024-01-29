import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class AccessToken extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  token!: string;

  @Column()
  expirationDate!: Date;

  @OneToOne(() => User, user => user.accessToken)
  @JoinColumn()
  user!: User;
}
