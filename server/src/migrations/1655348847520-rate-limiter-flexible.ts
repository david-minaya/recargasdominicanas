import { MigrationInterface, QueryRunner } from 'typeorm';

export class rateLimiterFlexible1655348847520 implements MigrationInterface {

  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(`
      CREATE TABLE \`rlflx\` (
        \`key\` VARCHAR(255) CHARACTER SET utf8 NOT NULL,
        \`points\` INT(9) NOT NULL default 0,
        \`expire\` BIGINT UNSIGNED, 
        PRIMARY KEY (\`key\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(`DROP TABLE \`rlflx\``);
  }
}
