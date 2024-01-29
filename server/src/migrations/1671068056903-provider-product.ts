import { MigrationInterface, QueryRunner } from 'typeorm';

export class providerProduct1671068056903 implements MigrationInterface {

  name = 'providerProduct1671068056903'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`provider_product\` ADD \`enabled\` tinyint NOT NULL DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`provider_product\` DROP COLUMN \`enabled\``);
  }
}
