import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTransaction1651278591968 implements MigrationInterface {

  name = 'updateTransaction1651278591968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`cancelled\` tinyint NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`reference\``);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`reference\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`reference\``);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`reference\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`cancelled\``);
  }
}
