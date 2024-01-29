import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class TempPassword extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  password!: string;

  @Column()
  expirationDate!: Date;

  @OneToOne(() => User, user => user.tempPassword)
  @JoinColumn()
  user!: User;
}
