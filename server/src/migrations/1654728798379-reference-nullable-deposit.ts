import { MigrationInterface, QueryRunner } from 'typeorm';

export class referenceNullableDeposit1654728798379 implements MigrationInterface {

  name = 'referenceNullableDeposit1654728798379'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`deposit\` CHANGE \`reference\` \`reference\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`deposit\` CHANGE \`reference\` \`reference\` varchar(255) NOT NULL`);
  }
}
