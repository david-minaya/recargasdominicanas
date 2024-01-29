import { MigrationInterface, QueryRunner } from 'typeorm';

export class transactionCounter1651153977204 implements MigrationInterface {

  name = 'transactionCounter1651153977204'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`transaction_counter\` (\`id\` int NOT NULL, \`value\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`reference\``);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`reference\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`reference\``);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`reference\` varchar(255) NOT NULL`);
    await queryRunner.query(`DROP TABLE \`transaction_counter\``);
  }
}
