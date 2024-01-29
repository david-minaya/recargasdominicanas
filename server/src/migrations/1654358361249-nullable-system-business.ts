import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullableSystemBusiness1654358361249 implements MigrationInterface {

  name = 'nullableSystemBusiness1654358361249'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`business\` CHANGE \`system\` \`system\` enum ('WEB_APP', 'MOBILE_APP') NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`business\` CHANGE \`system\` \`system\` enum ('WEB_APP', 'MOBILE_APP') NOT NULL`);
  }
}
