import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppRelease } from './appRelease.entity';

@Entity()
export class ReleaseNote extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ length: 1000 })
  description!: string;

  @ManyToOne(() => AppRelease, appRelease => appRelease.releaseNotes)
  appRelease!: AppRelease;
}
