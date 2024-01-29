import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProviderConfig1653058400313 implements MigrationInterface {

  name = 'updateProviderConfig1653058400313'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_3145fa800807128484449b1b86\` ON \`provider_config\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3145fa800807128484449b1b86\` ON \`provider_config\` (\`name\`)`);
  }
}
