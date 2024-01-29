import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNegativeProfit1657587665214 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM profit WHERE amount < 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
