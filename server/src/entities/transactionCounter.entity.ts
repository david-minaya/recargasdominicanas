import { BaseEntity, Column, Entity, getManager, PrimaryColumn } from 'typeorm';

@Entity()
export class TransactionCounter extends BaseEntity {

  @PrimaryColumn()
  id!: number;

  @Column()
  value!: number;

  static async nextValue() {

    return getManager().transaction(async entityManager => {

      const counter = await entityManager.findOne(TransactionCounter);
      const nextValue = counter?.value ? counter.value + 1 : 1;

      await entityManager.save(TransactionCounter, { 
        id: 1, 
        value: nextValue
      });

      return nextValue.toString().padStart(9, '0');
    });
  }
}
