import { MigrationInterface, QueryRunner } from 'typeorm';

export class pin1671669751300 implements MigrationInterface {
  
  name = 'pin1671669751300'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`price\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`pin\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`type\` \`type\` enum ('Recarga', 'Paquetico', 'Pin') NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`percent\` \`percent\` decimal(10,2) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`min\` \`min\` decimal(10,2) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`max\` \`max\` decimal(10,2) NULL`);
    await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`price\` ADD CONSTRAINT \`FK_47d081ba217e201d4245e9d76d0\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`price\` DROP FOREIGN KEY \`FK_47d081ba217e201d4245e9d76d0\``);
    await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`max\` \`max\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`min\` \`min\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`percent\` \`percent\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`type\` \`type\` enum ('Recarga', 'Paquetico') NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`pin\``);
    await queryRunner.query(`DROP TABLE \`price\``);
  }
}
