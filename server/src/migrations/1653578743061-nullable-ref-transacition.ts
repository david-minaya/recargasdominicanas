import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullableRefTransacition1653578743061 implements MigrationInterface {

  name = 'nullableRefTransacition1653578743061'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`reference\` \`reference\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`reference\` \`reference\` varchar(255) NOT NULL`);
  }
}
