import { MigrationInterface, QueryRunner } from 'typeorm';

export class pinInstructions1683248524568 implements MigrationInterface {

  name = 'pinInstructions1683248524568'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`pin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`instructions\` varchar(255) NULL, \`productId\` int NULL, UNIQUE INDEX \`REL_e155f2d0f2e39a0d2cdcf0bbf7\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`price\` ADD \`pinId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`pin\` ADD CONSTRAINT \`FK_e155f2d0f2e39a0d2cdcf0bbf79\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`price\` ADD CONSTRAINT \`FK_b9d532b859b6a17de8198bf8884\` FOREIGN KEY (\`pinId\`) REFERENCES \`pin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`price\` DROP FOREIGN KEY \`FK_b9d532b859b6a17de8198bf8884\``);
    await queryRunner.query(`ALTER TABLE \`pin\` DROP FOREIGN KEY \`FK_e155f2d0f2e39a0d2cdcf0bbf79\``);
    await queryRunner.query(`ALTER TABLE \`price\` DROP COLUMN \`pinId\``);
    await queryRunner.query(`DROP INDEX \`REL_e155f2d0f2e39a0d2cdcf0bbf7\` ON \`pin\``);
    await queryRunner.query(`DROP TABLE \`pin\``);
  }
}
