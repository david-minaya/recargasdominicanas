import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReleaseNote } from './releaseNote.entity';

@Entity()
export class AppRelease extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  version!: string;

  @Column()
  filename!: string;

  @Column({ unique: true })
  path!: string;

  @Column()
  date!: Date;

  @Column({ default: false })
  published!: boolean;

  @OneToMany(() => ReleaseNote, releaseNote => releaseNote.appRelease, { cascade: ['insert'] })
  releaseNotes!: ReleaseNote[];
}
