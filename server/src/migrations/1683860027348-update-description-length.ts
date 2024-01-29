import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateDescriptionLength1683860027348 implements MigrationInterface {

  name = 'updateDescriptionLength1683860027348'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`release_note\` MODIFY \`description\` varchar(1000) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`release_note\` MODIFY \`description\` varchar(255) NOT NULL`);
  }
}
