import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Business } from './business.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  docNumber!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ unique: true, nullable: true })
  email?: string;
  
  @Column({ type: 'varchar', unique: true, nullable: true, select: false })
  password!: string | null;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;

  @OneToMany(() => Business, business => business.customer, { cascade: true })
  business!: Business[];
}
